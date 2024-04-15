import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { FargateRunner } from './index';

export class FargateRunnerTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // import default vpc
    const vpc = Vpc.fromLookup(this, 'MyVpc', { isDefault: true });

    // define cloudwatch log group for fargate task
    const logGroup = new LogGroup(this, 'MyLogGroup', { removalPolicy: RemovalPolicy.DESTROY });

    // Define the Fargate Task
    const taskDefinition = new ecs.FargateTaskDefinition(this, 'MyTask', {
      runtimePlatform: {
        operatingSystemFamily: ecs.OperatingSystemFamily.LINUX,
        cpuArchitecture: ecs.CpuArchitecture.ARM64,
      },
    });

    // import exiting ecr repo
    const repo = ecr.Repository.fromRepositoryName(this, 'MyRepo', 'exit0');

    // Add a container to the task
    taskDefinition.addContainer('MyContainer', {
      image: ecs.ContainerImage.fromEcrRepository(repo),
      logging: ecs.LogDriver.awsLogs({
        streamPrefix: 'MyPrefix',
        logGroup,
      }),
    });

    const myFargateRunner = new FargateRunner(this, 'MyRunner', {
      fargateTaskDef: taskDefinition,
      timeout: `${60 * 5}`,
      vpc: vpc,
    });

    // create a sqs and depends on  the Fargate task
    const myQueue = new Queue(this, 'MyQueue', {});

    myQueue.node.addDependency(myFargateRunner);

  }
}
const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: 'us-east-1',
};
new FargateRunnerTestStack(app, 'FargateRunnerTestStack', { env: env });
