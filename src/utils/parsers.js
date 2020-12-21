const getCurrentDate = () => {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'est'
  });
};

const localizeTime = (time) => {
  const timeString = new Date(time);
  const localizedTime = timeString.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
  return localizedTime;
};

export { getCurrentDate, localizeTime };
