const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'est'
  });
};

const constructStart = date => {
  const today = new Date(date);
  return returnQueryDateString(today);
};

const constructEnd = date => {
  const today = new Date(date);
  today.setDate(today.getDate() + 1);
  return returnQueryDateString(today);
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

export { getCurrentDate, constructStart, constructEnd, localizeTime };
