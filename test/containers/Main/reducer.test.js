import { expect } from 'chai';
import main from 'containers/Main/reducer';
import * as at from 'constants/actionTypes';
import immutable from 'immutable';

describe('main reducer', () => {
  it('test CHANGE_MESSAGE ok!', () => {
    const mymessage = main(immutable.fromJS({}), {
      type: at.CHANGE_MESSAGE,
      message: '',
    });
    expect(mymessage.get('message')).to.be.equal('');
  });
  it('test CHANGE_RESULT ok!', () => {
    const myresult = main(immutable.fromJS({}), {
      type: at.CHANGE_RESULT,
      result: '',
    });
    expect(myresult.get('result')).to.be.equal('');
  });
  it('test default ok!', () => {
    const mydefault = main(immutable.fromJS({}), {
      type: '',
      result: '',
    });
    expect(mydefault.get('result')).to.be.equal(undefined);
  });
});
