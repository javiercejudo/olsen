/*jshint node:true, mocha:true */

'use strict';

var ofAKind = require('../src/olsen');

var physicalPostcodeProps, physicalAddressProps, equalsProps;

function wrapProtoFunc(protoFunc) {
  return function(x) {
    var len = arguments.length;
    var argIndex;
    var additionalArgs = [];

    for (argIndex = 1; argIndex < len; len += 1) {
      additionalArgs[argIndex - 1] = arguments[argIndex];
    }

    return protoFunc.apply(x, additionalArgs);
  };
}

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
].map(wrapProtoFunc);

physicalAddressProps = physicalPostcodeProps.concat([
  Address.prototype.getNumber,
  Address.prototype.getStreet
].map(wrapProtoFunc));

equalsProps = physicalAddressProps.concat([
  Address.prototype.getResident
].map(wrapProtoFunc));

Address.prototype.samePhysicalPostcode = function(anotherAddress) {
  return physicalPostcodeProps.every(ofAKind(anotherAddress, this));
};

Address.prototype.samePhysicalAddress = function(anotherAddress) {
  return physicalAddressProps.every(ofAKind(anotherAddress, this));
};

Address.prototype.equals = function(anotherAddress) {
  return equalsProps.every(ofAKind(anotherAddress, this));
};

module.exports = Address;
