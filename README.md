# Fargate Runner
This module will create an ECS cluster and run a Fargate task as you defined. It will pause the CloudFormation Stack until the Fargate task is complete and success. 
## Usage:
```typescript
import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { FargateRunner } from 'fargate-runner';

export class FargateRunnerTestStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Define the Fargate Task
        const taskDefinition = new ecs.FargateTaskDefinition(this, 'MyTask', {});
        // import exiting ecr repo
        const repo = ecr.Repository.fromRepositoryName(this, 'MyRepo', 'RepoName');
        // Add a container to the task
        taskDefinition.addContainer('MyContainer', {
            image: ecs.ContainerImage.fromEcrRepository(repo),
        });
        // Create the Fargate runner
        new FargateRunner(this, 'MyRunner', {
            fargateTaskDef: taskDefinition,
        });
    }
}
const app = new cdk.App();

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};
new FargateRunnerTestStack(app, 'FargateRunnerTestStack', { env: env });
```

### Construct Prop
| Name     | Type      | Description           |
|----------|-----------|-----------------------|
| fargateTaskDef    | ecs.TaskDefinition     | Fargate task definition that you would like to run (required) |
| timeout    | string     | the timeout of the task. Default 1 hour  |
| count    | number     | the number of SUCCESS signal that stack expect to receive, each container will send 1 signal once complete. Default 1  |
|vpc|ec2.IVpc|the VPC that ECS Cluster will be created. Default create new VPC|
