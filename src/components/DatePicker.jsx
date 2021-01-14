import React from 'react';

const DatePicker = () => {
  return (
    <form className="datePicker">
      <label for="month">Choose month:</label>
      <select name="month" id="month" className="dropdownItem">
          <option value="01">January</option>
          <option value="02">February</option>
      </select>
    </form>
  );
};

export default DatePicker;