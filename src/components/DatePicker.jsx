import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Tide prediction is limited to 10 years from current date

const DatePicker = ({
  date,
  onDateChange,
  // futureLoaded,
  // formattedDate,
  // predictionsFuture,
  // onBackClick,
}) => (
  <div className="datePicker">
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
    />
  </div>
);

DatePicker.propTypes = {
  date: PropTypes.object,
  onDateChange: PropTypes.func,
};

export default DatePicker;
