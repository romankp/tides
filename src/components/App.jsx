import React from 'react';
import { baseUrl, stationId } from '../constants.js';

const startDate = 20201216;
const endDate = 20201217;
const completeUrl = `${baseUrl}?station=${stationId}&datum=STND&time_zone=lst&begin_date=${startDate}&end_date=${endDate}&units=english&format=json&product=predictions&interval=hilo`;

const fetchTideData = async () => {
  const response = await fetch(completeUrl).catch((e) => {
    console.error(`Fetch request failed: ${e}`);
  });
  const data = await response.json();
  return data;
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      predictionsArray: []
    };
  }

  componentDidMount() {
    fetchTideData().then((data) => {
      const { predictions } = data;
      console.log(JSON.stringify(predictions));
      this.setState({
        predictionsArray: predictions
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Tides</h1>
        {this.state.predictionsArray.map((prediction) => (
          <p key={prediction.t}>
            {prediction.type} {prediction.t}
          </p>
        ))}
      </React.Fragment>
    );
  }
}

export default App;
