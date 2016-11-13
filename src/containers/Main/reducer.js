import * as at from 'constants/actionTypes';
import immutable from 'immutable';

const INITIAL_STATE = immutable.fromJS({
  result: '',
  message: '',
});

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
