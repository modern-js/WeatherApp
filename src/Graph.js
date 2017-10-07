const React = require('react');
const helpers = require('./api/helpers');
const _ = require('lodash');
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = require('recharts');

function Graph(props) {
  let data = _.clone(props.data);
  _.forEach(data, (temperature) => {
    temperature.temp.min = helpers.convertTemp(temperature.temp.min);
    temperature.temp.max = helpers.convertTemp(temperature.temp.max);
  });
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
      >
        <XAxis />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temp.max" name={'Max temp'} stroke="#82ca9d" />
        <Line type="monotone" dataKey="temp.min" name={'Min temp'} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
module.exports = Graph;
