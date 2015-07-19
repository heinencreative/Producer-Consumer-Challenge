var chai = require("chai"),
    expect = chai.expect,
    assert = chai.assert,
    sinonChai = require('sinon-chai'),
    sinon = require('sinon');

var helper = require('../lib/helper');

chai.use(sinonChai);

describe('Helper',function(){
  describe('#log()',function(){
    beforeEach(function() {
      sinon.spy(console,'log');
    });
    afterEach(function() {
      console.log.restore();
    });
    it('should log timestamp and message', function () {
      var message = "Mocha test";
      helper.log(message);
      // datetime regex - http://stackoverflow.com/questions/3143070/javascript-regex-iso-datetime
      var regexTest = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)+\ \- .*/.test(console.log.getCall(0).args[0]);
      expect(console.log).to.have.been.calledOnce;
      expect(regexTest).to.be.true;
    });
  });
});
