import React, { Component, PropTypes } from 'react';

class output extends Component {
  static propTypes = {
    result: PropTypes.string.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <pre>{ this.props.result }</pre>
      </div>
    );
  }
}


export default output;
