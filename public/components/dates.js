function dates (element, data) {
	const stackedByDate = records
  	.reduce((result, record) => {
  		const key = record.date.substring(0, 10);

  		return {
  			...result,
  			[key]: true
  		};
  	}, {});
 	const dates = Object.keys(stackedByDate);

 	element.innerHTML = `
 		<a href="?">Clear</>
	 	${dates
	 		.map((date) => `<a href="?date=${date}">${date}</a>`)
	 		.join('')}
 	`;
}