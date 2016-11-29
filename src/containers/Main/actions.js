import * as at from 'constants/actionTypes';

export function changeName(name) {
  return {
    type: at.CHANGE_NAME,
    name,
  };
}

// changeMessage触发时，改变store的message
export function changeMessage(message) {
  return {
    type: at.CHANGE_MESSAGE,
    message,
  };
}

// changeResult触发时，改变store的result
export function changeResult(result) {
  return {
    type: at.CHANGE_RESULT,
    result,
  };
}
// export function randomName(num) {
//   return async (dispatch) => {
//     const response = await fetch('/hello', {
//       method: 'post',
//       body: JSON.stringify({
//         num,
//       }),
//     });
//     const result = await response.json();
//     return dispatch(changeName(result.name));
//   };
// }
// export function handleCommand(message) {
//   return (dispatch) => {
//     socket.emit('send', message);
//     socket.on('return', (result) => {
//       dispatch(changeResult(result));
//     });
//   };
// }

// socket.emit方法发出send指令并传送数据message,在此例中为value
// socket.on方法收到return指令,就调用dispatch方法,通过reducer改变state
// 在 传统的 Flux 实现中，当调用 action 创建函数时，一般会触发一个 dispatch，像这样：

// function addTodoWithDispatch(text) {
//   const action = {
//     type: ADD_TODO,
//     text
//   }
//   dispatch(action)
// }
// 不同的是，Redux 中只需把 action 创建函数的结果传给 dispatch() 方法即可发起一次 dispatch 过程。

// dispatch(addTodo(text))
// dispatch(completeTodo(index))
