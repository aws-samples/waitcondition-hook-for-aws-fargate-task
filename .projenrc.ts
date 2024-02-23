import { awscdk } from 'projen';
const PROJ_DESCRIPTION = 'AWS CDK Construct that run a Fargate task. Stack will process only when Fargate task executed successfully and all containers exit with code 0, otherwise rollback';
const PROJECT_NAME = 'waitcondition-hook-for-aws-fargate-task';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Stan Fan',
  authorAddress: 'fanhongy@amazon.com',
  cdkVersion: '2.109.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: PROJECT_NAME,
  projenrcTs: true,
  repositoryUrl: 'https://github.com/aws-samples/waitcondition-hook-for-aws-fargate-task.git',
  deps: [
    'aws-cdk-lib@2.109.0',
    'constructs@10.0.5',
  ],
  description: PROJ_DESCRIPTION,
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve'],
    },
  },
  keywords: ['aws', 'cdk', 'fargate', 'ecs', PROJECT_NAME],
  majorVersion: 1,
  packageName: PROJECT_NAME,
  publishToPypi: {
    distName: PROJECT_NAME,
    module: PROJECT_NAME,
  },
  stability: 'experimental',
});
const common_exclude = ['cdk.out/*', 'cdk.out', 'cdk.context.json', 'yarn-error.log', 'coverage', 'cdk.context.json', 'yarn.lock', 'package-lock.json'];
project.gitignore.exclude(...common_exclude);
project.synth();