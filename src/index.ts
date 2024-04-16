import * as path from 'path';
import { Duration, CfnWaitCondition, CfnWaitConditionHandle, Stack } from 'aws-cdk-lib';
import { IVpc, Vpc } from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Code, Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as stepfunctions_tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';

export interface FargateRunnerProps {
  readonly fargateTaskDef: ecs.TaskDefinition;
  readonly timeout?: string;
  readonly count?: number;
  readonly vpc?: IVpc;
}

export class FargateRunner extends Construct {
  public readonly waitConditionHanlderEndpoint: string;
  private readonly waitCondition: CfnWaitCondition;
  constructor(scope: Construct, id: string, props: FargateRunnerProps) {
    super(scope, id);

    // ecs cluster
    const cluster = new ecs.Cluster(this, 'FargateRunnerCluster', {
      vpc: props.vpc ?? new Vpc(this, 'FargateRunnerVpc', {
        maxAzs: 2,
      }),
    });

    //use time stamp for uiniq ID for resource that need to be recareted.
    const uniqueValue = Date.now().toString();

    //wait condition handler
    const waitConditionHandler = new CfnWaitConditionHandle(this, `FargateRunnerWaitConditionHandle-${uniqueValue}`, {
    });

    //wait condition
    this.waitCondition = new CfnWaitCondition(this, `FargateRunnerWaitCondition-${uniqueValue}`, {
      count: props.count ?? 1,
      timeout: props.timeout ?? `${60 * 60}`,
      handle: waitConditionHandler.ref,
    });

    //Lambda execution role:
    const executionRole = new iam.Role(this, 'CallbackExecutionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
    });

    //add persmission of ecs:DescribeTasks to the execution role
    executionRole.addToPolicy(new iam.PolicyStatement({
      actions: ['ecs:DescribeTasks'],
      resources: [`arn:aws:ecs:${Stack.of(this).region}:${Stack.of(this).account}:task/${cluster.clusterName}/*`],
      effect: iam.Effect.ALLOW,
      sid: 'CallbackDescribeTasks',
    }));

    //add permision of lambda execution role to write log to CloudWatch
    executionRole.addToPolicy(new iam.PolicyStatement({
      actions: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents', 'logs:DescribeLogStreams'],
      resources: ['*'],
      effect: iam.Effect.ALLOW,
      sid: 'CallbackLog',
    }));

    //lambda function that send SUCCESS Signal back to WaitCondition
    const callbackFunction = new Function(this, 'CallbackFunction', {
      code: Code.fromAsset(path.join(__dirname, ('../lambda/callbackFunction'))),
      runtime: Runtime.PYTHON_3_10,
      handler: 'app.lambda_handler',
      timeout: Duration.seconds(180),
      environment: {
        WAIT_CONDITION_HANDLE_URL: waitConditionHandler.ref,
      },
      role: executionRole,
    });

    //errorhandler function, to send FAILURE Signal back to WaitCondition
    const errorHandlerFunction = new Function(this, 'ErrorHandlerFunction', {
      code: Code.fromAsset(path.join(__dirname, ('../lambda/errorhandlerFunction'))),
      runtime: Runtime.PYTHON_3_10,
      handler: 'app.lambda_handler',
      role: executionRole,
      timeout: Duration.seconds(180),
      environment: {
        WAIT_CONDITION_HANDLE_URL: waitConditionHandler.ref,
      },
    });
    // task definition
    const taskDefinition = props.fargateTaskDef;

    // Define the ECS Run Task using Step Functions
    const runTask = new stepfunctions_tasks.EcsRunTask(this, 'RunFargateTask', {
      integrationPattern: stepfunctions.IntegrationPattern.RUN_JOB,
      cluster,
      taskDefinition,
      assignPublicIp: true,
      launchTarget: new stepfunctions_tasks.EcsFargateLaunchTarget({
        platformVersion: ecs.FargatePlatformVersion.LATEST,
      }),
      //add error handler and send FAILURE signal to Wait Condition to stop the stack.
    }).addCatch(new stepfunctions_tasks.LambdaInvoke(this, 'Handle Error', {
      lambdaFunction: errorHandlerFunction,
      resultPath: '$.errorInfo',
    }), {
      errors: ['States.ALL'], // Catch all errors
    });


    // Define Lambda function step function statemachine task
    const lambdaTask = new stepfunctions_tasks.LambdaInvoke(this, 'InvokeLambdaTask', {
      lambdaFunction: callbackFunction,
      inputPath: '$',
    });

    // define the step function chain
    const chain = stepfunctions.Chain.start(runTask).next(lambdaTask);

    // execution role for statemachine:
    const stateMachineExecutionRole = new iam.Role(this, 'FargateRunnerStateMachineExecutionRole', {
      assumedBy: new iam.ServicePrincipal('states.amazonaws.com'),
    });
    stateMachineExecutionRole.addToPolicy(new iam.PolicyStatement({
      actions: ['lambda:InvokeFunction'],
      resources: [callbackFunction.functionArn, errorHandlerFunction.functionArn],
      effect: iam.Effect.ALLOW,
      sid: 'InvokeLambda',
    }));

    // add iam:PassRole to the execution role
    stateMachineExecutionRole.addToPolicy(new iam.PolicyStatement({
      actions: ['iam:PassRole'],
      resources: [executionRole.roleArn, stateMachineExecutionRole.roleArn],
      effect: iam.Effect.ALLOW,
      sid: 'PassRole',
    }));

    // add ecs:RunTask permission to the execution role
    stateMachineExecutionRole.addToPolicy(new iam.PolicyStatement({
      actions: ['ecs:RunTask'],
      resources: [taskDefinition.taskDefinitionArn],
      effect: iam.Effect.ALLOW,
      sid: 'RunTask',
    }));


    // define the statemachine
    const stateMachine = new stepfunctions.StateMachine(this, 'FargateRunnerStateMachine', {
      definitionBody: stepfunctions.DefinitionBody.fromChainable(chain),
      // timeout: timeoutDuration
      // role: stateMachineExecutionRole,
    });

    //define triggering custom resource
    const customResourceTrigger = new cr.AwsCustomResource(this, `FargateRunnerTrigger-${uniqueValue}`, {
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE }),
      onCreate: {
        service: 'StepFunctions',
        action: 'startExecution',
        parameters: {
          stateMachineArn: stateMachine.stateMachineArn,
        },
        physicalResourceId: cr.PhysicalResourceId.of(Date.now().toString()),
      },
    });

    //add dependency: Trigger custom resource depends on waitcondition handler
    customResourceTrigger.node.addDependency(waitConditionHandler);

    //expose the waitcondition url
    this.waitConditionHanlderEndpoint = waitConditionHandler.ref;

    //default child
    this.node.defaultChild = this.waitCondition;
  };
}
