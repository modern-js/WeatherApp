const React = require('react');
const helpers = require('./api/helpers');

function DayItem(props) {
  const date = helpers.getDate(props.day.dt);
  const icon = props.day.weather[0].icon;
  return (
    <div onClick={props.onClick} className="dayContainer">
      <img className="weather" src={require(`./api/images/${icon}.svg`)} alt="Weather" />
      <h2 className="subheader">{date}</h2>
      <h3>{props.day.temp.day} degrees</h3>
    </div>
  );
}

module.exports = DayItem;
