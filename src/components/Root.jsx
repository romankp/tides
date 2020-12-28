import React, { Component, Fragment } from 'react';
import {
  baseUrl,
  stationId,
  paramsToday,
  paramsFull
} from '../utils/constants.js';
import { getCurrentDate, localizeTime } from '../utils/parsers.js';
import Today from './Today';

// const startDate = 20201216;
// const endDate = 20201217;
const urlFull = `${baseUrl}?station=${stationId}${paramsFull}`;
const urlToday = `${baseUrl}?station=${stationId}${paramsToday}`;
const currentTime = Date.now();
// const nextEvent = 'high 8:03 PM';

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
      predictionsArray: [],
      nextEvent: {}
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
      }, 500);
      const nextPrediction =
        this.state.predictionsArray.find(({ t }) => {
          const predictionDate = new Date(t);
          if (currentTime < predictionDate) {
            return true;
          }
          return false;
        }) || {};
      this.setState({ nextEvent: nextPrediction });
    });
  }

  render() {
    let {
      loaded,
      currentDate,
      predictionsArray,
      nextEvent: { t, type }
    } = this.state;
    return (
      <div className={`main${loaded ? ' show' : ''}`}>
        <h1>Tides</h1>
        <Today predictions={predictionsArray} date={currentDate} />
        <div className="next">
          <h2>Next Event</h2>
          <p>
            {type} {localizeTime(t)}
          </p>
        </div>
      </div>
    );
  }
}

export default Root;
