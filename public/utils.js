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

function generateDateKey (value) {
	const date = new Date(value);
	const a = (x) => x.toString().padStart(2, '0');
	const b = (x) => x.toString().padStart(4, '0');
	const day = a(date.getDate());
	const month = a(date.getMonth());
	const year = b(date.getFullYear());
	const hours = a(date.getHours());
	const minutes = a(parseInt(date.getMinutes() / 10) * 10)

	return `${day}-${month}-${year} ${hours}:${minutes}`;
}