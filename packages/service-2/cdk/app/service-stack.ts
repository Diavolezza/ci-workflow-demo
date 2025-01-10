import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { resolve as pathResolve } from 'path';
import { LambdaFunction } from '../lib/lambda-function';

export class ServiceStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const simpleDemoLambda1 = new LambdaFunction(this, 'SimpleDemoLambda1', {
      entry: pathResolve(__dirname, '../../src/lambda-handler/simple-function.ts'),
      timeout: Duration.seconds(15),
      memorySize: 128,
      environment: {},
    });

    const simpleDemoLambda2 = new LambdaFunction(this, 'SimpleDemoLambda2', {
      entry: pathResolve(__dirname, '../../src/lambda-handler/simple-function.ts'),
      timeout: Duration.seconds(15),
      memorySize: 128,
      environment: {},
    });
    simpleDemoLambda2.node.addDependency(simpleDemoLambda1);

    const bulkyDemoLambda1 = new LambdaFunction(this, 'BulkyDemoLambda1', {
      entry: pathResolve(__dirname, '../../src/lambda-handler/bulky-function-1.ts'),
      timeout: Duration.seconds(15),
      memorySize: 128,
      environment: {},
    });

    const bulkyDemoLambda2 = new LambdaFunction(this, 'BulkyDemoLambda2', {
      entry: pathResolve(__dirname, '../../src/lambda-handler/bulky-function-2.ts'),
      timeout: Duration.seconds(15),
      memorySize: 128,
      environment: {},
    });
    bulkyDemoLambda2.node.addDependency(bulkyDemoLambda1);

    const bulkyDemoLambda3 = new LambdaFunction(this, 'BulkyDemoLambda3', {
      entry: pathResolve(__dirname, '../../src/lambda-handler/bulky-function-3.ts'),
      timeout: Duration.seconds(15),
      memorySize: 128,
      environment: {},
    });
    bulkyDemoLambda3.node.addDependency(bulkyDemoLambda2);
  }
}
