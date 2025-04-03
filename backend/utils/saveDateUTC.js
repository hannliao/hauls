const { parse } = require('date-fns');

const saveDateUTC = (localDate) => {
  const localDateObj = new Date(localDate);

  localDateObj.setUTCHours(12, 0, 0, 0);

  const utcDate = localDateObj.toISOString();

  return utcDate;
};

module.exports = saveDateUTC;
