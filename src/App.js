const React = require('react');
const ZipCode = require('./ZipCode');
const Forecast = require('./Forecast');
const Details = require('./Details');
const ReactRouter = require('react-router-dom');

const BrowserRouter = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Router = ReactRouter.Router;

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Route render={props => (
            <div className="navbar">
              <button
                className="logo-button"
                onClick={() => {
                  props.history.push({
                    pathname: '/',
                  });
                }}
              ><h1>Weather</h1></button>
              <ZipCode
                direction="row"
                onSubmitZipcode={(city) => {
                  props.history.push({
                    pathname: '/forecast',
                    search: `?city=${city}`,
                  });
                }}
                zipcode={123}
              />
            </div>
          )}
          />

          <Route
            exact
            path="/"
            render={props => (
              <div className="home-container">
                <h1 className="header">Enter a City</h1>
                <ZipCode
                  direction="column"
                  onSubmitZipcode={(city) => {
                    props.history.push({
                      pathname: '/forecast',
                      search: `?city=${city}`,
                    });
                  }}
                  zipcode={123}
                />
              </div>
            )}
          />
          <Route path="/" component={Router} />
          <Route path="/forecast" component={Forecast} />
          <Route path="/details/:city" component={Details} />
        </div>
      </BrowserRouter>
    );
  }
}

module.exports = App;
