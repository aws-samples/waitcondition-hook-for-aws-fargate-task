import { App, Stack, RemovalPolicy } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { FargateRunner } from '../src/index';


const app = new App();
const stack = new Stack(app, 'TestStack');

const logGroup = new LogGroup(stack, 'MyLogGroup', { removalPolicy: RemovalPolicy.DESTROY });

// Define the Fargate Task
const taskDefinition = new ecs.FargateTaskDefinition(stack, 'MyTask', {
  runtimePlatform: {
    operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
    cpuArchitecture: ecs.CpuArchitecture.ARM64,
  },
});

const repo = ecr.Repository.fromRepositoryName(stack, 'MyRepo', 'exit0');

// Add a container to the task
taskDefinition.addContainer('MyContainer', {
  image: ecs.ContainerImage.fromEcrRepository(repo),
  logging: ecs.LogDriver.awsLogs({
    streamPrefix: 'MyPrefix',
    logGroup,
  }),
});

new FargateRunner(stack, 'testStack', {
  fargateTaskDef: taskDefinition,
});

const template = Template.fromStack(stack);


test('Lambda functions should be configured with appropriate properties and execution roles', () => {
  template.hasResourceProperties('AWS::Lambda::Function', {
    Handler: 'app.lambda_handler',
    Runtime: 'python3.12',
    Timeout: 180,
  });
  template.hasResourceProperties('AWS::IAM::Role', {
    AssumeRolePolicyDocument: {
      Statement: [
        {
          Action: 'sts:AssumeRole',
          Effect: 'Allow',
          Principal: {
            Service: 'lambda.amazonaws.com',
          },
        },
      ],
      Version: '2012-10-17',
    },
  });
});

test('Step Functions and Custom Resource', () => {
  template.resourceCountIs('AWS::StepFunctions::StateMachine', 1);
  template.resourceCountIs('Custom::AWS', 1);
},

);