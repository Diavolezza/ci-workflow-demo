import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { resolve as pathResolve } from 'path';
import { LambdaFunction } from '../lib/lambda-function';

export class ServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bulkyDemoLambda = new LambdaFunction(this, 'BulkyDemoLambda', {
      entry: pathResolve(__dirname, '../../src/lambda-handler/bulky-function.ts'),
      timeout: Duration.seconds(15),
      memorySize: 128,
      environment: {},
    });

    const simpleDemoLambda1 = new LambdaFunction(this, 'SimpleDemoLambda1', {
      entry: pathResolve(__dirname, '../../src/lambda-handler/simple-function.ts'),
      timeout: Duration.seconds(15),
      memorySize: 128,
      environment: {},
    });
    simpleDemoLambda1.node.addDependency(bulkyDemoLambda);

    const simpleDemoLambda2 = new LambdaFunction(this, 'SimpleDemoLambda2', {
      entry: pathResolve(__dirname, '../../src/lambda-handler/simple-function.ts'),
      timeout: Duration.seconds(15),
      memorySize: 128,
      environment: {},
    });
    simpleDemoLambda2.node.addDependency(simpleDemoLambda1);
  }
}