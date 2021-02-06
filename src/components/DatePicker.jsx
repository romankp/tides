import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { months } from '../utils/constants.js';

// Tide prediction is limited to 10 years from current date

const Option = (value, string) => (
  <option key={string} value={value}>
    {string}
  </option>
);

const DatePicker = ({ date }) => {
  console.log(date);
  return (
    <div className="datePicker">
      <Calendar calendarType="US" />
    </div>
  );
};

DatePicker.propTypes = {
  date: PropTypes.object,
};

export default DatePicker;
