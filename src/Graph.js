const React = require('react');
const _ = require('lodash');
const helper = require('./api/helpers')
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = require('recharts');

function Graph(props) {
  let data = _.clone(props.data);
  _.forEach(data, (temperature) => {
    temperature.date = helper.getFullDate(temperature.dt)
    temperature.temp.min = temperature.temp.min;
    temperature.temp.max = temperature.temp.max;
  });
  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
      >
        <XAxis dataKey="date" />
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
