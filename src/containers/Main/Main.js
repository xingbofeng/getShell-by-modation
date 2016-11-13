import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators, createStore } from 'redux';
import { connect } from 'react-redux';
import * as MainActions from './actions';
import { Input, Button, Row, Col } from 'antd';
import Output from 'components/Output';
import Mainstore from './reducer';
import * as io from 'socket.io-client';

const socket = io.connect('http://localhost:8000');

const store = createStore(Mainstore);
function mapStateToProps(state) {
  const { main } = state;
  return { main };
}

function mapDispatchToProps(dispatch) {
  return {
    mainActions: bindActionCreators(MainActions, dispatch),
  };
}

@connect(mapStateToProps, mapDispatchToProps)
class Main extends Component {
  static propTypes = {
    main: PropTypes.object.isRequired,
    mainActions: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    main: PropTypes.object,
    mainActions: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.state = {
      message: '',
      result: '',
    };
  }

  getChildContext() {
    const { main, mainActions } = this.props;
    return { main, mainActions };
  }

  handleClick() {
    this.setState({ result: store.getState().toJS().result });
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ message: value });
    const message = MainActions.changeMessage(value);
    store.dispatch(message);
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleClick();
    }
  }
  render() {
    // const { result, message } = this.props.main.toJS();
    const message = store.getState().toJS().message;
    socket.emit('send', message);
    socket.on('return', (result) => {
      store.dispatch(MainActions.changeResult(result));
    });
    return (
      <div className={style.content}>
        <Row>
          <Col span={12}><Input onChange={this.handleChange} onKeyDown={this.handleKeyDown} /></Col>
          <Col span={12}><Button type="primary" size="large" onClick={this.handleClick}>Submit</Button></Col>
        </Row>
        <Output result={this.state.result} />
      </div>
    );
  }
}

export default Main;
