# Waitcondition Hook for AWS Fargate task
WaitCondition hook for AWS Fargate tasks is a AWS CDK Construct that helps builders to run a AWS Fargate task with one or multiple container embedded into a CloudFormation lifecycle. You can use this construct add dependency between resources and the AWS Fargate task execution result (eg. Database migration, image build and packing, invoking third party/on-prem API). waitcondition-hook-for-aws-fargate-task construct will also handle the failure of the task, and rollback the CloudFormation stack after. 
## Prerequisites
1. An AWS account
2. AWS Cloud Development Kit (CDK). For more information about this, see AWS CDK Toolkit (cdk command) in the AWS CDK documentation.
3. Node package manager (npm), installed and configured for CDK Typescript. For more information about this, see Downloading and installing Node.js and npm in the npm documentation.
## Target architecture
![Workflow](./image/workflow.png)

## Deployment steps

### Install the package: 
```bash
yarn add waitcondition-hook-for-aws-fargate-task
```
### Usage:
```typescript
import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { FargateRunner } from 'waitcondition-hook-for-aws-fargate-task';
import { Queue } from 'aws-cdk-lib/aws-sqs';

export class FargateRunnerTestStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        // Define the VPC
        const vpc = new Vpc(this, 'MyVpc')
        // Define the Fargate Task
        const taskDefinition = new ecs.FargateTaskDefinition(this, 'MyTask', {});
        // Import exiting ecr repo
        const repo = ecr.Repository.fromRepositoryName(this, 'MyRepo', 'RepoName');
        // Add a container to the task
        taskDefinition.addContainer('MyContainer', {
            image: ecs.ContainerImage.fromEcrRepository(repo),
        });
        // Create the Fargate runner
        const myFargateRunner = new FargateRunner(this, 'MyRunner', {
            fargateTaskDef: taskDefinition,
            timeout: `${60 * 5}`,
            vpc: vpc,
        });
        // Create the SQS queue
        const myQueue = new Queue(this, 'MyQueue', {});
        // Add dependency
        myQueue.node.addDependency(myFargateRunner);
    }
}
const app = new cdk.App();

const env = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};
new FargateRunnerTestStack(app, 'FargateRunnerTestStack', { env: env });
```

### Deploy!
```bash
cdk deploy
```

## Useful CDK commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
    
## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This library is licensed under the MIT-0 License. See the LICENSE file.