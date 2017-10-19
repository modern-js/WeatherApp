const daysMap = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',

};

const monthsMap = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'Aug',
  8: 'Sept',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

function getDate(unixTimestmap) {
  const date = new Date(unixTimestmap * 1000);
  const day = daysMap[date.getDay()];
  const month = `${monthsMap[date.getMonth()]} ${date.getDate()}`;
  return `${day}, ${month}`;
}

function getFullDate(unixTimestmap) {
  const date = new Date(unixTimestmap * 1000);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getYear() + 1900}`;
}

module.exports = {
  getDate,
  getFullDate,
};
