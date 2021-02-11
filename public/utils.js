function average (...values) {
	return parseFloat((values.reduce((a,b) => a + b, 0) / values.length).toFixed(2));
}

function getStats (...values) {
	return {
		min: Math.min(...values),
		max: Math.max(...values),
		avg: average(...values)
	};
}

function translateDate (date) {
	return date.replace(/^(\d{2})\/(\d{2})/, '$2/$1');
}

function getImportantStats (data) {
	const downloads = data
		.map(({ speeds }) => speeds.download);
	const uploads = data
		.map(({ speeds }) => speeds.upload);
	const pings = data
		.map(({ server }) => server.ping);
	
	return {
		download: getStats(...downloads),
		upload: getStats(...uploads),
		ping: getStats(...pings)
	};
}

function getImportantStatsOnlyAvg (data) {
	const { download, upload, ping } = getImportantStats(data);
	return {
		download: download.avg,
		upload: upload.avg,
		ping: ping.avg
	};
}

function getSuccessAndFailures (data) {
	const success = data
		.filter(({ success }) => success !== false);
	const failures = data
  	.filter(({ success }) => success === false);
	
	return {
		success,
		failures
	};
}

function generateDateKey (value) {
	const date = new Date(value);
	const a = (x) => x.toString().padStart(2, '0');
	const b = (x) => x.toString().padStart(4, '0');
	const day = a(date.getDate());
	const month = a(date.getMonth());
	const year = b(date.getFullYear());
	const hours = a(date.getHours());
	const minutes = a(parseInt(date.getMinutes() / 10) * 10);

	return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function filterForAvg (records) {
	const stackedByDate = records
  	.reduce((result, record) => {
  		const date = new Date(translateDate(record.date));
  		const key = generateDateKey(date);
  		const values = result[key] || [];

  		return {
  			...result,
  			[key]: values.concat([record])
  		};
  	}, {});

  return Object.entries(stackedByDate)
  	.map(([key, value]) => {
  		const { download, upload, ping } = getImportantStatsOnlyAvg(value);

  		return {
				speeds: {
					download,
					upload
				},
				server: {
					ping
				},
				success: true,
				date: key
			};
  	}, {});
}

function filterForDate (records, { date }) {
	return records.filter((value) => {
		return value.date.substring(0, 10) === date;
	});
}

const FILTERS = {
	AVG: filterForAvg,
	DATE: filterForDate
};

function filter (data, activeFilter, props) {
	return activeFilter
		.filter((key) => typeof FILTERS[key] === 'function')
		.reduce((result, key) => FILTERS[key](result, props), data)
}