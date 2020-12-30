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

// If it's after the tidal cutoff time,
// return an array of prediction items for todays date
// AND the first item for tomorrow's date.
const truncatePredictions = (predictions, nextTime) => {
  if (isAfterCutoff && predictions.length) {
    const todayDate = new Date(predictions[0].t).getDate();
    const truncatedArray = predictions.filter(({ t }) => {
      const itemDate = new Date(t).getDate();
      return todayDate === itemDate;
    });
    // Attach first event from tomorrow
    const tomorrowItem = predictions.find(({ t }) => {
      const itemDate = new Date(t).getDate();
      return todayDate !== itemDate;
    });
    if (nextIsTomorrow(tomorrowItem.t, nextTime)) {
      truncatedArray.push(tomorrowItem);
    }
    return truncatedArray;
  }
  return predictions;
};

// Check that the next event is tomorrow
const nextIsTomorrow = (tomorrowTime, nextTime) => {
  const tomorrowDay = new Date(tomorrowTime).getDate();
  // Default to 0 since getDate never returns it, while nextTime is not ready
  const nextEventDay = nextTime ? new Date(nextTime).getDate() : 0;
  tomorrowDay === nextEventDay ? true : false;
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
        predictions.find(({ t }) => {
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
    const nextTime = nextEvent.t;
    return (
      <div className={`main${loaded ? ' show' : ''}`}>
        <h1>Tides</h1>
        <Today
          predictions={truncatePredictions(predictionsArray, nextTime)}
          date={currentDate}
          nextEvent={nextEvent}
        />
      </div>
    );
  }
}

export default Root;
