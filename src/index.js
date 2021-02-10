const { Worker, isMainThread } = require('worker_threads');
const { display } = require('./display')

const WORKER_SPEEDTEST_TARGET = `${__dirname}/speedtest.js`;
const WORKER_GENERATE_TARGET = `${__dirname}/generate.js`;
const RUN_GENERATE_INTERVAL = 5 * 60 * 1000;

let results = []

function runWorker (target) {
	return new Promise((resolve, reject) => {
		const worker = new Worker(target);

		worker.on('message', resolve);
		worker.on('exit', resolve);
		worker.on('error', reject);
	});
}

async function runSpeedtest () {
	const data = await runWorker(WORKER_SPEEDTEST_TARGET);

	if (results.length >= 100) {
    results.pop();
  }

  results.unshift(data);
  display(results);
}

async function runGenerate () {
	console.log('Generating ...');
	await runWorker(WORKER_GENERATE_TARGET);
	console.log('Generating done.');
}

function runInterval (interval) {
  setInterval(runSpeedtest, interval);
  setInterval(runGenerate, RUN_GENERATE_INTERVAL);
}

async function run () {
  await runSpeedtest();
  await runGenerate();
}

exports.runInterval = runInterval;
exports.run = run;
