import React, { Component } from 'react';

class Input extends Component {
  // static propTypes = {
  //   name: PropTypes.string.isRequired,
  //   mainActions: PropTypes.object.isRequired,
  // };

  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
}


export default Input;
