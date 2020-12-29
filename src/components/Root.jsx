import React, { Component, Fragment } from 'react';
import {
  baseUrl,
  stationId,
  paramsToday,
  paramsFull
} from '../utils/constants.js';
import { getCurrentDate, localizeTime } from '../utils/parsers.js';
import Today from './Today';

const startDate = 20201228;
const endDate = 20201229;
// TODO: use specific dates instead of "today" parameter as EST/EDT is several hours behind
const urlFull = `${baseUrl}?station=${stationId}${`&datum=STND&time_zone=lst&begin_date=${startDate}&end_date=${endDate}&units=english&format=json&product=predictions&interval=hilo`}`;
// const urlToday = `${baseUrl}?station=${stationId}${paramsToday}`;
const currentTime = Date.now();

// console.log(urlFull);

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
    fetchTideData(urlFull).then(data => {
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
    let { loaded, currentDate, predictionsArray, nextEvent } = this.state;
    console.log(nextEvent);
    return (
      <div className={`main${loaded ? ' show' : ''}`}>
        <h1>Tides</h1>
        <Today
          predictions={predictionsArray}
          date={currentDate}
          nextEvent={nextEvent}
        />
      </div>
    );
  }
}

export default Root;
