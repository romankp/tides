import React, { Component, Fragment } from 'react';
import {
  baseUrl,
  stationId,
  paramsToday,
  paramsFull
} from '../utils/constants.js';
import { getCurrentDate } from '../utils/parsers.js';
import Today from './Today';

// const startDate = 20201216;
// const endDate = 20201217;
const urlFull = `${baseUrl}?station=${stationId}${paramsFull}`;
const urlToday = `${baseUrl}?station=${stationId}${paramsToday}`;
const nextEvent = 'high 8:03 PM';

const fetchTideData = async url => {
  const response = await fetch(url).catch(e => {
    console.error(`Fetch request failed: ${e}`);
  });
  const data = await response.json();
  return data;
};

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: getCurrentDate(),
      loaded: false,
      predictionsArray: []
    };
  }

  componentDidMount() {
    fetchTideData(urlToday).then(data => {
      const { predictions } = data;
      this.setState({
        predictionsArray: predictions
      });
      setTimeout(() => {
        this.setState({
          loaded: true
        });
      }, 2000);
    });
  }

  render() {
    let { loaded, currentDate, predictionsArray } = this.state;
    return (
      <div className={`main${loaded ? ' show' : ''}`}>
        <h1>Tides</h1>
        <Today predictions={predictionsArray} date={currentDate} />
        <div className="next">
          <h2>Next Event</h2>
          <p>{nextEvent}</p>
        </div>
      </div>
    );
  }
}

export default Root;
