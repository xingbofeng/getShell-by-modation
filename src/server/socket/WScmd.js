import { exec } from 'child_process';

export function getCommandResult(message) {
  let data = '';
  const child = exec(message, (error, stdout, stderr) => {
    if (error) {
      this.emit('return', stderr);
    }
  });
  const output = child.stdout;
  output.on('data', (chunks) => {
    data += chunks;
    if (data.length > 600) {
      child.kill();
      return;
    }
    this.emit('return', data);
  });
}
// let lastPid = -1;
// export function getCommandResult(message) {
//   let data = '';
//   const child = exec(message, (error, stdout, stderr) => {
//     lastPid = -1;
//     if (error) {
//       this.emit('returnDT', stderr);
//     }
//   });
//   const output = child.stdout;
//   if (lastPid !== -1) {
//     try {
//       kill(lastPid, 'SIGINT');
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   lastPid = child.pid;
//   output.on('data', (chunks) => {
//     data += chunks;
//     this.emit('returnDT', data);
//   }).on('end', (chunks) => {
//     data += chunks || '';
//     this.emit('returnDT', data);
//   });
// }
