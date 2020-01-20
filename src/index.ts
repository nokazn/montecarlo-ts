import * as readline from 'readline';

const bar = '*'.repeat(100);

const progressBar = (current: number, end: number): void => {
  const percent = Math.floor((current / end) * 100);
  process.stdout.write(`${percent}% (${current} / ${end}) ${bar.slice(0, Math.floor(percent))}\r`);
};

const montecarlo = (n: number): number => {
  let counter = 0;
  for (let i = 0; i < n; i += 1) {
    const hypotenuse = Math.random() ** 2 + Math.random() ** 2;
    if (hypotenuse < 1) {
      counter += 1;
    }
    if (i % 1000 === 0) {
      progressBar(i, n);
    }
  }
  const pi = (4 * counter) / n;
  return pi;
};

const relp = (): Promise<number> => new Promise((resolve) => {
  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  }).question(
    'Please input large enough number.\n',
    (input: string): void => resolve(Number(input)),
  );
});

const main = async (): Promise<void> => {
  let n: number;
  do {
    // eslint-disable-next-line no-await-in-loop
    n = await relp();
  } while (Number.isNaN(n));
  const pi = montecarlo(n);
  process.stdout.write(`\nn: ${String(n)} => pi is ${String(pi)}\n`);
  process.exit();
};

main();
