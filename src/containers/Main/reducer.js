import * as at from 'constants/actionTypes';
import immutable from 'immutable';

const INITIAL_STATE = immutable.fromJS({
  result: '',
  message: '',
});
// immutable的update方法，更新immutable的Map数据结构（一种类似于对象的数据结构）
// 当action.type是change_result的时候，更新state的result键值为action.result
// 当action.type是change_message的时候，更新state的message键值为action.message
export default function main(state = INITIAL_STATE, action) {
  switch (action.type) {
    case at.CHANGE_RESULT:
      return state.update('result', () => action.result);
    case at.CHANGE_MESSAGE:
      return state.update('message', () => action.message);
    default:
      return state;
  }
}
