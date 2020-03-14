/**
 * **Convert object array into time series data.**
 *
 * @param {Array} data - Object array
 * @return {Array} Time series data set
 */
const timeSeries = (data) => {
  const ret = [];
  data.forEach((val) => {
    const entry = [new Date(val.timestamp), val.data.watts];
    ret.push(entry);
  });

  return ret;
};

export default timeSeries;
