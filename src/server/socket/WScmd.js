import { exec } from 'child_process';
// 调用child_process模块的exec方法
// child_process是node比较重要的一个模块，通过它可以创建多线程，从而实现多核CPU
// 主要是以下四个函数spawn，exec，execFile，fork
// spawn是最原始的创建子进程的函数，剩下的三个是对这个函数不同程度的封装
// spawn不支持回调函数，fork只能执行js文件，如fork('./child.js')
// 当你想要从子进程返回大量数据时使用spawn，如果只是返回简单的状态信息，那么使用exec
// exec和execFile均支持回调函数。区别就是后者不用启动独立的shell，相对来说更加轻量级
// 我们拿execFile举例说明（打开存放在固定位置的bat文件，执行文件的命令行）

// 用法是：child_process.exec(command, [options], callback)
// child_process.spawn(command, [args], [options])需要明确制定子进程所在的位置
// 返回值是对象，有srdin，stdout，stderr属性

// child.stdin 获取标准输入
// child.stdout 获取标准输出
// child.stderr 获取标准错误输出
// 获取子进程的PID：child.pid
// 提供生成子进程的重要方法：child_process.spawn(cmd, args=[], [options])
// 提供直接执行系统命令的重要方法：child_process.exec(cmd, [options], callback)
// 提供杀死进程的方法：child.kill(signal='SIGTERM')
export function getCommandResult(message) {
  let data = '';
  const child = exec(message, (error, stdout, stderr) => {
    if (error) {
      // 如果错误，则向前台发送stderr，在这里，this指的是socket
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
    // 否则发送正确的值
    this.emit('return', data);
  });
}
