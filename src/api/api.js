const axios = require('axios');

function prepRouteParams(queryStringData) {
  return Object.keys(queryStringData)
    .map(key => `${key}=${encodeURIComponent(queryStringData[key])}`).join('&');
}

function prepUrl(type, queryStringData) {
  return `http://api.openweathermap.org/data/2.5/${type}?${prepRouteParams(queryStringData)}`;
}

function getQueryStringData(city) {
  return {
    q: city,
    type: 'accurate',
    APPID: '542ffd081e67f4512b705f89d2a611b2',
    cnt: 4,
  };
}

function getForecast(city) {
  const queryStringData = getQueryStringData(city);
  const url = prepUrl('forecast/daily', queryStringData);

  return axios.get(url)
    .then(forecastData => forecastData.data);
}

module.exports = {
  getForecast,
};
