/*jshint node:true, mocha:true */

'use strict';

require('should');

var ofAKind = require('../src/olsen');

describe('use case', function() {
  it('even kind of has a cool use case', function() {
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

    Address.prototype.samePostcode = function(anotherAddress) {
      return [
        Address.prototype.getPostcode,
        Address.prototype.getCountry
      ].every(ofAKind(this, anotherAddress));
    };

    Address.prototype.sameAddress = function(anotherAddress) {
      return [
        Address.prototype.getNumber,
        Address.prototype.getStreet,
        Address.prototype.getPostcode,
        Address.prototype.getCountry
      ].every(ofAKind(this, anotherAddress));
    };

    var address1 = new Address('Javier', '100', 'George', '2000', 'Australia');
    var address2 = new Address('Jenna', '100', 'George', '2000', 'Australia');
    var address3 = new Address('Anna', '105', 'George', '2000', 'Australia');
    var address4 = new Address('Javier', '32', 'Gran Via', '2000', 'Spain');

    address1.samePostcode(address2).should.be.true;
    address1.sameAddress(address2).should.be.true;

    address1.samePostcode(address3).should.be.true;
    address1.sameAddress(address3).should.be.false;

    address1.samePostcode(address4).should.be.false;
    address1.sameAddress(address4).should.be.false;
  });
});
