/*jshint node:true, mocha:true */

'use strict';

require('should');

var ofAKind = require('../src/olsen');

function wrapProtoFuncs(protoFunc) {
  return function(x) {
    return protoFunc.call(x);
  }
}

describe('use case', function() {
  it('even kind of has a cool use case', function() {
    var physicalPostcodeProps, physicalAddressProps, equalsProps;

    function Address(resident, number, street, postcode, country) {
      this.resident = resident;
      this.number = number;
      this.street = street;
      this.postcode = postcode;
      this.country = country;
    }

    Address.prototype.getResident = function() {
      return this.resident;
    };

    Address.prototype.getNumber = function() {
      return this.number;
    };

    Address.prototype.getStreet = function() {
      return this.street;
    };

    Address.prototype.getPostcode = function() {
      return this.postcode;
    };

    Address.prototype.getCountry = function() {
      return this.country;
    };

    physicalPostcodeProps = [
      Address.prototype.getPostcode,
      Address.prototype.getCountry
    ].map(wrapProtoFuncs);

    physicalAddressProps = physicalPostcodeProps.concat([
      Address.prototype.getNumber,
      Address.prototype.getStreet
    ].map(wrapProtoFuncs));

    equalsProps = physicalAddressProps.concat([
      Address.prototype.getResident
    ].map(wrapProtoFuncs));

    Address.prototype.samePhysicalPostcode = function(anotherAddress) {
      return physicalPostcodeProps.every(ofAKind(anotherAddress, this));
    };

    Address.prototype.samePhysicalAddress = function(anotherAddress) {
      return physicalAddressProps.every(ofAKind(anotherAddress, this));
    };

    Address.prototype.equals = function(anotherAddress) {
      return equalsProps.every(ofAKind(anotherAddress, this));
    };

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
