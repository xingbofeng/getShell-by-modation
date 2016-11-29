import * as socketIo from 'socket.io';
import { getCommandResult } from './WScmd';

export function register(server, options, next) {
  const io = socketIo.listen(server.listener);
  // socket触发send事件时，向前台传递getCommandResult的返回值，即调用系统子进程之后的命令返回值
  io.on('connection', (socket) => {
    socket.on('send', getCommandResult);
  });
  // next是一个callback function
  next();
  // 最后执行next函数
}

// 为Hapi添加插件：用register方法添加
register.attributes = {
  name: 'myPlugin',
};
