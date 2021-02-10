function displayOne (data, silent = false) {
  if (!data.success) {
    if (!silent) {
      console.log(data);
    }

    return data;
  }

  const { speeds, client, server, date } = data;
  const displayValues = {
    download: `${speeds.download} Mbps`,
    upload: `${speeds.upload} Mbps`,
    ping: `${server.ping} ms`,
    country: server.country,
    location: server.location,
    isp: client.isp,
    ip: client.ip,
    date
  };

  if (!silent) {
    console.log(displayValues);
  }

  return displayValues;
}

function display (results, silent = false) {
  const last = displayOne(results[0], true);
  const downloads = results
    .filter(({ success }) => success !== false)
    .map(({ speeds }) => speeds.download);
  const failures = results
    .filter(({ success }) => success === false);
  const min = Math.min(...downloads);
  const max = Math.max(...downloads);
  const avg = downloads.reduce((a,b) => a + b, 0) / downloads.length;
  const displayValues = {
    last,
    min: `${min} Mbps`,
    max: `${max} Mbps`,
    avg: `${avg} Mbps`,
    failures: `${failures.length}`
  };

  if (!silent) {
    console.log(displayValues);
  }

  return displayValues;
}

exports.displayOne = displayOne;
exports.display = display;
