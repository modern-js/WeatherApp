const React = require('react');
const api = require('./api/api');
const queryString = require('query-string');
const DayItem = require('./DayItem');
const Graph = require('./Graph');
const _ = require('lodash');

const localstorage = window.localStorage;

class Forecast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecastData: [],
      loading: true,
    };
    this.makeRequest = this.makeRequest.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    this.city = queryString.parse(this.props.location.search).city;
    this.makeRequest(this.city);
  }
  componentWillReceiveProps(nextProps) {
    this.city = queryString.parse(nextProps.location.search).city;
    this.makeRequest(this.city);
  }
  makeRequest(city) {
    this.setState(() => ({
      loading: true,
    }));
    api.getForecast(city)
      .then(() => {
        const res = {};
        res.list = [];
        _.forEach(JSON.parse(localstorage.getItem(city)), (record) => {
          res.city = record.city;
          res.list.push(record.weather);
        });
        this.setState(() => ({
          loading: false,
          forecastData: res,
        }));
      });
  }
  handleClick(city) {
    city.city = this.city;
    city.lon = this.state.forecastData.city.coord.lon;
    city.lat = this.state.forecastData.city.coord.lat;
    this.props.history.push({
      pathname: `/details/${this.city}`,
      state: city,
    });
  }
  render() {
    return this.state.loading === true
      ? <h1 className="forecast-header"> Loading </h1>
      : <div>
        <h1 className="forecast-header">{this.city.toUpperCase()}</h1>
        <div className="forecast-graph">
          <Graph data={this.state.forecastData.list} />
        </div>
        <div className="forecast-container">
          {this.state.forecastData.list.map(
            listItem =>
              (<DayItem
                onClick={
                  this.handleClick.bind(this, listItem)
                }
                key={listItem.dt}
                day={listItem}
              />), this)}
        </div>
      </div>;
  }
}

module.exports = Forecast;
