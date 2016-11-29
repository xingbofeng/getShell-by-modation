import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import Output from 'components/Output/Output';

const props = {
  result: 'result',
};

const context = {
  mainActions: {
    changeMessage: sinon.spy(),
  },
};

describe('Output component', () => {
  it('Render OK!', () => {
    const wrap = shallow(<Output {...props} />, { context });
    expect(wrap.find('pre').length).to.be.equal(1);
    expect(wrap.find('pre').text()).to.be.equal('result');
  });
});
