import React from 'react';
import { token, baseUrl, stationId } from '../constants.js';

const startDate = 20201216;
const endDate = 20201217;
const completeUrl = `${baseUrl}?station=${stationId}&datum=STND&time_zone=lst&begin_date=${startDate}&end_date=${endDate}&units=english&format=json&product=predictions&interval=hilo`;

const fetchStationData = async () => {
  const response = await fetch(completeUrl).catch((e) => {
    console.error(`Fetch request failed: ${e}`);
  });
  const data = await response.json();
  return data;
};

fetchStationData().then((data) => {
  console.log(JSON.stringify(data));
});

const App = () => (
  <div>
    <h1>Tides</h1>
    <p>This is where tide heights will eventually show up.</p>
    <p>{completeUrl}</p>
  </div>
);

export default App;
