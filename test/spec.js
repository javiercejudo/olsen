/*jshint node:true, mocha:true */

'use strict';

require('should');

var olsen = require('../src/olsen');

function isEven(x) {
  return x % 2 === 0;
}

function identity(x) {
  return x;
}

describe('olsen', function() {
  it('should validate two of a kind', function() {
    olsen(1, 1)(Number).should.be.true;
    olsen(1, '1')(Number).should.be.true;
    olsen(1, 0.99999999999999999)(Number).should.be.true; // 0.999... becomes exactly 1

    olsen(1, 3)(isEven).should.be.true; // both of kind "not even"
    olsen(2, 4)(isEven).should.be.true; // both of kind "even"

    olsen(Math.PI / 4, (7 / 4) * Math.PI)(function(x) {
      return Math.cos(x).toFixed(10);
    }).should.be.true;
  });

  it('should invalidate different kinds', function() {
    olsen(1, 2)(isEven).should.be.false;
    olsen(1, 0.9999999999999999)(Number).should.be.false;
    olsen(NaN, NaN)(identity).should.be.false; // NaN !== NaN
  });
});
