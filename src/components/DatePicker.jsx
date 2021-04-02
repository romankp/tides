import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { months } from '../utils/constants.js';

// Tide prediction is limited to 10 years from current date

const DatePicker = ({ date, onDateChange }) => {
  console.log;
  return (
    <div className="datePicker">
      <Calendar
        calendarType="US"
        onChange={updatedDate => {
          console.log(updatedDate);
          onDateChange(updatedDate);
        }}
        value={date}
      />
    </div>
  );
};

DatePicker.propTypes = {
  date: PropTypes.object,
  onDateChange: PropTypes.func,
};

export default DatePicker;
