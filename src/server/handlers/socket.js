import * as socketIo from 'socket.io';

export function register(server, options, next) {
  const io = socketIo.listen(server.listener);
  io.on('connection', (socket) => {
    socket.on('send', 'hello world');
    socket.emit('return', 'hello world');
  });
  next();
}
