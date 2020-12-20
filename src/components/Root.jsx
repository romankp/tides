import React, { Component } from 'react';
import { baseUrl, stationId } from '../utils/constants.js';
import { localizeTime } from '../utils/parsers.js';

// const startDate = 20201216;
// const endDate = 20201217;
// const urlFull = `${baseUrl}?station=${stationId}&datum=STND&time_zone=lst&begin_date=${startDate}&end_date=${endDate}&units=english&format=json&product=predictions&interval=hilo`;
const urlToday = `${baseUrl}?station=${stationId}&datum=STND&time_zone=lst&date=today&units=english&format=json&product=predictions&interval=hilo`;

const fetchTideData = async (url) => {
  const response = await fetch(url).catch((e) => {
    console.error(`Fetch request failed: ${e}`);
  });
  const data = await response.json();
  return data;
};

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'est'
      }),
      loaded: false,
      predictionsArray: []
    };
  }

  componentDidMount() {
    fetchTideData(urlToday).then((data) => {
      const { predictions } = data;
      console.log(JSON.stringify(predictions));
      this.setState({
        predictionsArray: predictions,
        loaded: true
      });
    });
  }

  render() {
    let { loaded, currentDate, predictionsArray } = this.state;
    return (
      <div className={`main${loaded && ' show'}`}>
        <h1>Tides</h1>
        <h2>Today / {currentDate}</h2>
        {predictionsArray.map(({ t, type }) => {
          return (
            <p key={t}>
              {type} {localizeTime(t)}
            </p>
          );
        })}
      </div>
    );
  }
}

export default Root;
