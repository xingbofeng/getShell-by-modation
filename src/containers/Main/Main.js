import style from './style.css';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators, createStore } from 'redux';
import { connect } from 'react-redux';
import * as MainActions from './actions';
import { Input, Button, Row, Col } from 'antd';
import Output from 'components/Output';
import Mainstore from './reducer';
import * as io from 'socket.io-client';
// 引入action和reducer
// 引入antd组件库
const socket = io.connect('http://localhost:8000');
// 用websocket模块建立与服务器的常连接
const store = createStore(Mainstore);
// 创建store
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
    // 绑定this
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
    // 点击submit按钮变更state，从后台获取result并显示到前台
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ message: value });
    const message = MainActions.changeMessage(value);
    store.dispatch(message);
    // 当input里的数据变更时，触发action，通过redux的reducer变更store
  }

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleClick();
    }
    // 按下回车键触发click事件
  }
  render() {
    const message = store.getState().toJS().message;
    socket.emit('send', message);
    socket.on('return', (result) => {
      store.dispatch(MainActions.changeResult(result));
    });
    // socket模块的emit方法：绑定一个send事件，向后台发送message信息，即输出框里的value
    // socket模块的on方法：绑定一个return事件，接收到后台发送的result信息，即后台返回的命令行执行结果
    // 收到后台返回的result信息之后，通过store.dispatch方法改变store
    // render方法里的message保存stroe的message信息，渲染到页面上
    return (
      <div className={style.content}>
        <span className={style.title}>please input a command</span>
        <Row>
          <Col span={12}><Input
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          </Col>
          <Col span={12}><Button type="primary" size="large" onClick={this.handleClick}>Submit</Button></Col>
        </Row>
        <Output result={this.state.result} />
      </div>
    );
  }
}

export default Main;
