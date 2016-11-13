import * as socketIo from 'socket.io';
import { getCommandResult } from './WScmd';

export function register(server, options, next) {
  const io = socketIo.listen(server.listener);
  io.on('connection', (socket) => {
    socket.on('send', getCommandResult);
  });
  next();
}

register.attributes = {
  name: 'myPlugin',
};
