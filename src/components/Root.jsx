import React, { Component, Fragment } from 'react';
import {
  getCurrentDateString,
  constructQueryDate
} from '../utils/componentUtils.js';
import Today from './Today';
import DatePicker from './DatePicker';

const baseUrl = process.env.BASE_URL;
const stationId = process.env.STATION_ID;

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
const truncatePredictions = (current, predictions, nextTime) => {
  if (isAfterCutoff && predictions.length) {
    const currentDay = current.getDate();
    // Truncate predictions to today's date
    const truncatedArray = predictions.filter(({ t }) => {
      const itemDay = new Date(t).getDate();
      return currentDay === itemDay;
    });
    // Tomorrow's first todal event
    const tomorrowItem = predictions.find(({ t }) => {
      const itemDay = new Date(t).getDate();
      return currentDay !== itemDay;
    });
    // If next event is tommorrow, attach tomorrow's first tidal event to predictions
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
  return tomorrowDay === nextEventDay;
};

const returnNextEvent = predictions => {
  return (
    predictions.find(({ t }) => {
      const predictionDate = new Date(t);
      if (currentTime < predictionDate) {
        return true;
      }
      return false;
    }) || {}
  );
};

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDateString: getCurrentDateString(currentTime),
      loaded: false,
      predictionsArray: [],
      nextEvent: {}
    };
  }

  componentDidMount() {
    fetchTideData(urlFull).then(({ predictions }) => {
      this.setState({
        predictionsArray: predictions,
        nextEvent: returnNextEvent(predictions)
      });
      setTimeout(() => {
        this.setState({
          loaded: true
        });
      }, 500);
    });
  }

  render() {
    const {
      loaded,
      currentDateString,
      predictionsArray,
      nextEvent
    } = this.state;
    const nextTime = nextEvent.t;
    return (
      <div className={`wrapper${loaded ? ' show' : ''}`}>
        <div className="main">
          <h1>Tides</h1>
          <Today
            predictions={truncatePredictions(
              currentTime,
              predictionsArray,
              nextTime
            )}
            date={currentDateString}
            nextEvent={nextEvent}
          />
        </div>
        <DatePicker />
      </div>
    );
  }
}

export default Root;
