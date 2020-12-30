const getCurrentDateString = date => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'est'
  });
};

const constructQueryDate = (date, isTomorrow) => {
  const workingDate = new Date(date);
  if (isTomorrow) {
    workingDate.setDate(workingDate.getDate() + 1);
  }
  return returnQueryDateString(workingDate);
};

const returnQueryDateString = date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return `${year}${month + 1}${day}`;
};

const localizeTime = time => {
  const timeString = new Date(time);
  const localizedTime = timeString.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return localizedTime;
};

export { getCurrentDateString, constructQueryDate, localizeTime };
