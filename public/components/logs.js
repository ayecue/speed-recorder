function logs (element, data) {
	const logBody = element.querySelector('tbody');

	for (let i = data.length - 1; i >= 0; i--) {
  	const entry = document.createElement("tr");

  	entry.innerHTML = `
  		<td>${data[i].date}</td>
      <td>${data[i].speeds.download}</td>
      <td>${data[i].speeds.upload}</td>
      <td>${data[i].server.ping}</td>
  	`;

    logBody.append(entry);
  }
}