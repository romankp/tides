import React, { Component } from 'react';
import { baseUrl, stationId } from '../utils/constants.js';
import { getCurrentDate, constructQueryDate } from '../utils/componentUtils.js';
import Today from './Today';

const returnTodaysCutoff = date => {
  const workingDate = new Date(date);
  workingDate.setHours(18, 47, 30);
  return workingDate;
};

const currentTime = new Date();
const tidalCutoff = returnTodaysCutoff(currentTime);
const isAfterCutoff = currentTime >= tidalCutoff ? true : false;
const startDate = constructQueryDate(currentTime, false);
// Request tomorrow's date string only if it's past the tidal cutoff time
const endDate = constructQueryDate(currentTime, isAfterCutoff);
const urlFull = `${baseUrl}?station=${stationId}${`&datum=STND&time_zone=lst&begin_date=${startDate}&end_date=${endDate}&units=english&format=json&product=predictions&interval=hilo`}`;

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
    // console.log(predictionsArray);
    // console.log(nextEvent);
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
