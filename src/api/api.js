const axios = require('axios');
const helpers = require('./helpers');
const _ = require('lodash');

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
    cnt: 5,
    units: 'metric',
  };
}

function getForecast(city) {
  const queryStringData = getQueryStringData(city);
  const url = prepUrl('forecast/daily', queryStringData);
  return axios.get(url)
    .then((forecastData) => {
      const temp = {};
      _.forEach(forecastData.data.list, (item) => {
        _.set(temp, [helpers.getFullDate(item.dt)], {
          city: forecastData.data.city,
          weather: item,
        },
        );
      });
      localstorage.setItem(forecastData.data.city.name, JSON.stringify(temp));
    });
}


module.exports = {
  getForecast,
};
