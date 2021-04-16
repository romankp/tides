import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { localizeTime } from '../utils/componentUtils.js';
import 'react-calendar/dist/Calendar.css';

// Tide prediction is limited to 10 years from current date
const hilo = {
  H: 'high',
  L: 'low',
};

const FuturePredictions = (
  futureLoaded,
  formattedDate,
  predictionsFuture,
  hilo
) => (
  <div className={!futureLoaded ? 'hide' : null}>
    <h2>{formattedDate}</h2>
    <ol>
      {predictionsFuture.map(({ type, t }) => {
        return (
          <li key={`${type}${t}`}>
            {hilo[type]} {localizeTime(t)}
          </li>
        );
      })}
    </ol>
    <span className={'back'}>&#8617;</span>
  </div>
);

const DatePicker = ({
  date,
  onDateChange,
  futureLoaded,
  formattedDate,
  predictionsFuture,
}) => {
  return (
    <div className="datePicker">
      {futureLoaded ? (
        FuturePredictions(futureLoaded, formattedDate, predictionsFuture, hilo)
      ) : (
        <Calendar
          calendarType="US"
          onChange={updatedDate => {
            // This is a temporary solution to accommodate DST in my area.
            // We don't really need to know the time of day right now.
            // TODO: Dynamic check for offset
            const adjustedDate = new Date(updatedDate.setHours(2));
            onDateChange(adjustedDate);
          }}
          value={date}
          className={futureLoaded ? 'hide' : null}
        />
      )}
    </div>
  );
};

DatePicker.propTypes = {
  date: PropTypes.object,
  onDateChange: PropTypes.func,
  futureLoaded: PropTypes.bool,
  ormattedDate: PropTypes.string,
  predictionsFuture: PropTypes.array,
};

export default DatePicker;
