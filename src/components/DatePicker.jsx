import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { months } from '../utils/constants.js';

// Tide prediction is limited to 10 years from current date

const DatePicker = ({ date }) => {
  const [value, onChange] = useState(date);
  console.log(date);
  console.log(value);
  return (
    <div className="datePicker">
      <Calendar calendarType="US" onChange={onChange} value={value} />
    </div>
  );
};

DatePicker.propTypes = {
  date: PropTypes.object,
};

export default DatePicker;
