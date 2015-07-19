var chai = require("chai"),
    expect = chai.expect,
    assert = chai.assert,
    sinonChai = require('sinon-chai'),
    sinon = require('sinon');

var helper = require('../lib/helper'),
    calc = require('../lib/calc');

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
  describe('#parse()',function(){
    it('should return an array with a length of 3',function(){
      expect(helper.parse('1+2=')).to.be.an('Array');
      expect(helper.parse('1+2=')).to.have.length(3);
    });
    it('should return an integer for first element in array',function(){
      expect(helper.parse('1+2=')[0]).to.equal('1');
    });
    it('should return a float for first element in array',function(){
      expect(helper.parse('1.001+2=')[0]).to.equal('1.001');
    });
    it('should return null if first element in expression is not a number',function(){
      expect(helper.parse('Q+2=')).to.be.null;
    });
    it('should return an operator for second element in array',function(){
      expect(helper.parse('1+2=')[1]).to.equal('+');
    });
    it('should return null if second element in expression is not an operator',function(){
      expect(helper.parse('1;2=')).to.be.null;
    });
    it('should return an integer for third element in array',function(){
      expect(helper.parse('1+2=')[2]).to.equal('2');
    });
    it('should return a float for third element in array',function(){
      expect(helper.parse('1+2.001=')[2]).to.equal('2.001');
    });
    it('should return null if third element in expression is not a number',function(){
      expect(helper.parse('1+P=')).to.be.null;
    });
  });
});

describe('Calc',function(){
  describe('#operators', function(){
    it('should contain +,-,/,*', function () {
      expect(calc.operators).to.include('+');
      expect(calc.operators).to.include('-');
      expect(calc.operators).to.include('/');
      expect(calc.operators).to.include('*');
    });
  });
  describe('#randomNumber()',function(){
    it('should return an integer', function () {
      var result = calc.randomNumber(1,10,true);
      assert.isNumber(result);
      var isInt = result % 1 === 0;
      assert(isInt, 'not an integer: ' + result);
    });
    it('should return a float', function () {
      var result = calc.randomNumber(1,10,false);
      assert.isNumber(result);
      var isInt = result % 1 !== 0;
      assert(isInt, 'not a float: ' + result);
    });
  });
});
