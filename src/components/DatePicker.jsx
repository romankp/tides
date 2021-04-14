import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import { localizeTime } from '../utils/componentUtils.js';
import 'react-calendar/dist/Calendar.css';

// Tide prediction is limited to 10 years from current date
const hilo = {
  H: 'high',
  L: 'low',
};

const DatePicker = ({
  date,
  onDateChange,
  futureLoaded,
  predictionsFuture,
}) => {
  let pickedDate = '';
  return (
    <div className="datePicker">
      <Calendar
        calendarType="US"
        onChange={updatedDate => {
          // This is a temporary solution to accommodate DST in my area.
          // We don't really need to know the time of day right now.
          // TODO: Dynamic check for offset
          const adjustedDate = new Date(updatedDate.setHours(2));
          pickedDate = adjustedDate;
          onDateChange(adjustedDate);
        }}
        value={date}
      />
      {futureLoaded && (
        <Fragment>
          <h2>{pickedDate}</h2>
          <ol>
            {predictionsFuture.map(({ type, t }) => {
              return (
                <li key={`${type}${t}`}>
                  {hilo[type]} {localizeTime(t)}
                </li>
              );
            })}
          </ol>
        </Fragment>
      )}
    </div>
  );
};

DatePicker.propTypes = {
  date: PropTypes.object,
  onDateChange: PropTypes.func,
  futureLoaded: PropTypes.bool,
  predictionsFuture: PropTypes.array,
};

export default DatePicker;
