import React from 'react';

// Tide prediction is limited to 10 years from current date

const DatePicker = () => {
  return (
    <form className="datePicker">
      <label for="month">Choose date:</label>
      <select name="month" id="month" className="dropdownItem">
        <option value="01">January</option>
        <option value="02">February</option>
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
