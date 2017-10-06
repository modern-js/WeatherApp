const React = require('react');
const DayItem = require('./DayItem');

class Details extends React.Component {
  render() {
    const props = this.props.location.state;
    return (
      <div>
        <DayItem day={props} />
        <div className="description-container">
          <p>{props.city.toUpperCase()}</p>
          <p>Longitude: {props.lon.toFixed(2)} Latitude: {props.lat.toFixed(2)}</p>
          <p>{props.weather[0].description}</p>
          <p>min temp: {props.temp.min} degrees</p>
          <p>max temp: {props.temp.max} degrees</p>
        </div>
      </div>
    );
  }
}

module.exports = Details;
