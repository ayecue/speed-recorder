const { parentPort } = require('worker_threads');
const result = require('speedtest-net')({ maxTime: 5000 });
const DateTime = require('datetime-js');
const fs = require('fs');

const TARGET = './logs';

function write (data) {
  const current = new Date();
  const onError = (err) => {
    if (err) throw err;
  };

  data.date = DateTime(current, '%d/%m/%Y %H:%i:%s');
  data.success = true;

  if (!fs.existsSync(TARGET)) fs.mkdirSync(TARGET, onError);

  const fileTarget = `${TARGET}/${DateTime(current, '%Y_%m_%d_%H_%i_%s')}.json`;

  fs.writeFileSync(fileTarget, JSON.stringify(data), onError);

  if (parentPort) parentPort.postMessage(data);
}

function writeError (err) {
	const data = {};
  const current = new Date();
  const onError = (err) => {
    if (err) throw err;
  };

  data.date = DateTime(current, '%d/%m/%Y %H:%i:%s');
  data.success = false;
  data.message = err.message;
  data.speeds = {
  	download: 0,
  	upload: 0
  };
  data.server = {
  	ping: 0
  };

  if (!fs.existsSync(TARGET)) fs.mkdirSync(TARGET, onError);

  const fileTarget = `${TARGET}/${DateTime(current, '%Y_%m_%d_%H_%i_%s')}.json`;

  fs.writeFileSync(fileTarget, JSON.stringify(data), onError);

  if (parentPort) parentPort.postMessage(data);
}

result.on('data', write);
result.on('error', writeError);
