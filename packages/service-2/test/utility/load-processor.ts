export async function runLightLoadTest(): Promise<void> {
  await runLoadTest('Light', 50_000);
}

export async function runMediumLoadTest(): Promise<void> {
  await runLoadTest('Medium', 75_000);
}

export async function runHeavyLoadTest(): Promise<void> {
  await runLoadTest('Heavy', 100_000);
}

async function runLoadTest(name: string, iterations: number) {
  const start = Date.now();

  // Generate multiple concurrent heavy computations
  const computations = Array.from({ length: 100 }, () => heavyComputation(iterations));
  // Run computations concurrently to maximize CPU usage
  const results = await Promise.all(computations);
  // Aggregate results
  const total = results.reduce((sum, val) => sum + val, 0);

  const end = Date.now();
  console.log(`${name} load test completed in ${(end - start) / 1000} seconds. Total result: ${total}`);
}

async function heavyComputation(iterations: number): Promise<number> {
  return new Promise((resolve) => {
    let result = 0;
    for (let i = 0; i < iterations; i++) {
      // Perform complex math operations to simulate load
      result += Math.sqrt(i) * Math.sin(i) * Math.tan(i) - Math.log(i + 1);
    }
    resolve(result);
  });
}
