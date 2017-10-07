const axios = require('axios');
const helpers = require('./helpers');

const localstorage = window.localStorage;

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
    cnt: 1,
  };
}

function getForecast(city) {
  const queryStringData = getQueryStringData(city);
  const url = prepUrl('forecast/daily', queryStringData);
  return axios.get(url)
    .then((forecastData) => {
      localstorage.setItem(forecastData.data.city.name, JSON.stringify({
        [helpers.getFullDate(forecastData.data.list[0].dt)]: forecastData.data,
      }));
    });
}


module.exports = {
  getForecast,
};
