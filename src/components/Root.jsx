import React, { Component } from 'react';
import {
  getCurrentDateString,
  constructQueryDate,
  buildFullURL,
} from '../utils/componentUtils.js';
import Today from './Today';
import DatePicker from './DatePicker';
import PickedDate from './PickedDate';

// We don't destructure here because of a limitation in how Parcel interacts with .env variables
const baseUrl = process.env.BASE_URL;
const stationId = process.env.STATION_ID;

const currentTime = new Date();
const tidalCutoff = new Date().setHours(18, 47, 30);
const isAfterCutoff = currentTime >= tidalCutoff;
const startDate = constructQueryDate(currentTime, false);
const endDate = constructQueryDate(currentTime, isAfterCutoff);
const urlFull = buildFullURL(baseUrl, stationId, startDate, endDate);

const fetchTideData = async url => {
  console.log('Fetching tide data.');
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    console.error(`Fetch request for tide data failed: ${e}`);
  }
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
    // Tomorrow's first tidal event
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

// Check that the next event is tomorrow,
// in case current date/time is past today's event times
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
    this.handleDateChange = this.handleDateChange.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.state = {
      currentDateString: getCurrentDateString(currentTime),
      loaded: false,
      predictionsToday: [],
      nextEvent: {},
      pickedDate: '',
      futureLoaded: false,
      predictionsFuture: [],
    };
  }

  componentDidMount() {
    fetchTideData(urlFull).then(({ predictions }) => {
      console.log('Tide data received.');
      this.setState({
        predictionsToday: predictions,
        nextEvent: returnNextEvent(predictions),
        loaded: true,
      });
      console.log('State updated.');
    });
  }

  handleDateChange(pickedDate) {
    const queryDate = constructQueryDate(pickedDate, false);
    const updatedURL = buildFullURL(baseUrl, stationId, queryDate, queryDate);
    console.log('Date updated.');
    fetchTideData(updatedURL).then(({ predictions }) => {
      console.log(`Updated date's tide data received.`);
      this.setState({
        predictionsFuture: predictions,
        pickedDate: getCurrentDateString(pickedDate),
        futureLoaded: true,
      });
      console.log('State updated.');
    });
  }

  showDatePicker() {
    this.setState({
      futureLoaded: false,
    });
  }

  render() {
    const {
      loaded,
      currentDateString,
      predictionsToday,
      nextEvent,
      futureLoaded,
      pickedDate,
      predictionsFuture,
    } = this.state;
    const nextTime = nextEvent.t;
    return (
      <div className={`wrapper${loaded ? ' show' : ''}`}>
        <div className="main">
          <h1>Tides</h1>
          <Today
            predictions={truncatePredictions(
              currentTime,
              predictionsToday,
              nextTime
            )}
            date={currentDateString}
            nextEvent={nextEvent}
          />
        </div>
        {futureLoaded ? (
          <PickedDate
            formattedDate={pickedDate}
            predictionsFuture={predictionsFuture}
            onBackClick={this.showDatePicker}
          />
        ) : (
          <DatePicker date={currentTime} onDateChange={this.handleDateChange} />
        )}
      </div>
    );
  }
}

export default Root;
