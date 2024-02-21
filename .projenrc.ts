import { awscdk } from 'projen';
const PROJ_DESCRIPTION = 'AWS CDK Construct that run a Fargate task. Stack will process only when Fargate task executed successfully and all containers exit with code 0, otherwise rollback';
const PROJECT_NAME = 'fargate-runner';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Stan Fan',
  authorAddress: 'fanhongy@amazon.com',
  cdkVersion: '2.109.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'fargate-runner',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/fanhongy/fargate-runner.git',
  deps: [
    'aws-cdk-lib@2.109.0',
    'constructs@10.0.5',
  ],
  license: 'Apache-2.0',
  description: PROJ_DESCRIPTION,
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve'],
    },
  },
  keywords: ['aws', 'cdk', 'fargate', 'ecs', 'fargate-runner'],
  majorVersion: 1,
  packageName: PROJECT_NAME,
  publishToPypi: {
    distName: PROJECT_NAME,
    module: 'cdk_fargate_runner',
  },
  stability: 'experimental',
});
const common_exclude = ['cdk.out/*', 'cdk.out', 'cdk.context.json', 'yarn-error.log', 'coverage', 'cdk.context.json'];
project.gitignore.exclude(...common_exclude);
project.synth();