/*jshint node:true, mocha:true */

'use strict';

require('should');

var Address = require('../fixtures/Address');

describe('use case', function() {
  it('even kind of has a cool use case', function() {
    var address1 = new Address('Javier', '100', 'George', '2000', 'Australia');
    var address2 = new Address('Jenna', '100', 'George', '2000', 'Australia');
    var address3 = new Address('Anna', '105', 'George', '2000', 'Australia');
    var address4 = new Address('Javier', '32', 'Gran Via', '2000', 'Spain');
    var address5 = new Address('Javier', '100', 'George', '2000', 'Australia');

    address1.samePhysicalPostcode(address2).should.be.true;
    address1.samePhysicalAddress(address2).should.be.true;
    address1.equals(address2).should.be.false;

    address1.samePhysicalPostcode(address3).should.be.true;
    address1.samePhysicalAddress(address3).should.be.false;
    address1.equals(address3).should.be.false;

    address1.samePhysicalPostcode(address4).should.be.false;
    address1.samePhysicalAddress(address4).should.be.false;
    address1.equals(address4).should.be.false;

    address1.samePhysicalPostcode(address5).should.be.true;
    address1.samePhysicalAddress(address5).should.be.true;
    address1.equals(address5).should.be.true;
  });
});
