import React from 'react';
import { key, stationId } from '../constants.js';

const App = () => (
  <React.Fragment>
    <h1>Tides</h1>
    <p>This is where tide heights will eventually show up.</p>
    <p>{key}</p>
    <p>{stationId}</p>
  </React.Fragment>
);

export default App;