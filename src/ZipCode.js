const React = require('react');
const PropTypes = require('prop-types');

class ZipCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zipcode: '',
    };

    this.handleSubmitZipcode = this.handleSubmitZipcode.bind(this);
    this.handleUpdateZipcode = this.handleUpdateZipcode.bind(this);
  }
  handleSubmitZipcode() {
    this.props.onSubmitZipcode(this.state.zipcode);
    this.setState(() => ({
      zipcode: '',
    }));
  }
  handleUpdateZipcode(e) {
    const zip = e.target.value;
    this.setState(() => ({
      zipcode: zip,
    }));
  }
  render() {
    return (
      <div className="zipcode-container" style={{ flexDirection: this.props.direction }}>
        <input
          className="form-control"
          onChange={this.handleUpdateZipcode}
          placeholder="Sofia"
          type="text"
          value={this.state.zipcode}
        />
        <button
          type="button"
          style={{ margin: 10 }}
          className="btn btn-success"
          onClick={this.handleSubmitZipcode}
        >
          Get Weather
        </button>
      </div>
    );
  }
}

ZipCode.defaultProps = {
  direction: 'column',
};

ZipCode.propTypes = {
  direction: PropTypes.string,
};

module.exports = ZipCode;
