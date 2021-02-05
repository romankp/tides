import React from 'react';
import { months } from '../utils/constants.js';

// Tide prediction is limited to 10 years from current date

const Option = (value, string) => (
  <option key={string} value={value}>
    {string}
  </option>
);

const DatePicker = () => {
  return (
    <form className="datePicker">
      <select name="month" id="month" className="dropdownItem">
        {months.map((month, i) => {
          return Option(i + 1, month);
        })}
      </select>
      <select name="day" id="day" className="dropdownItem">
        <option value="01">01</option>
        <option value="02">02</option>
      </select>
      <select name="year" id="year" className="dropdownItem">
        <option value="01">2021</option>
        <option value="02">2022</option>
      </select>
    </form>
  );
};

export default DatePicker;
