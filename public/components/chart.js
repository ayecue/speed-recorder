function chart (element, data) {
	const chartConfig = {
		type: 'line',
		data: {
			labels: data.map(({ date }) => date),
			datasets: [{
				label: 'Download',
				backgroundColor: 'rgb(75, 192, 192)',
				borderColor: 'rgb(75, 192, 192)',
				data: data.map(({ speeds }) => speeds.download),
				fill: false,
				pointRadius: 2,
				borderWidth: 1
			}, {
				label: 'Upload',
				fill: false,
				backgroundColor: 'rgb(54, 162, 235)',
				borderColor: 'rgb(54, 162, 235)',
				data: data.map(({ speeds }) => speeds.upload),
				pointRadius: 2,
				borderWidth: 1
			}]
		},
		options: {
			maintainAspectRatio: false,
			responsive: true,
			animation: {
      	duration: 0
      },
      hover: {
        animationDuration: 0
      },
      responsiveAnimationDuration: 0,
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Time'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Speed'
					}
				}]
			}
		}
	};

	const ctx = element.getContext('2d');
	
	return new Chart(ctx, chartConfig);
}