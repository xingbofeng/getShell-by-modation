import React, { Component, PropTypes } from 'react';
import style from './style.css';

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
        <span className={style.content}>Command Output:</span>
        <pre className={style.output}>{ this.props.result }</pre>
      </div>
    );
  }
}


export default output;
