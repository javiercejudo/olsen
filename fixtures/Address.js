/*jshint node:true, mocha:true */

'use strict';

var ofAKind = require('../src/olsen');

var physicalPostcodeProps, physicalAddressProps, equalsProps;

function wrapProtoFuncs(protoFunc) {
  return function(x) {
    return protoFunc.call(x);
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

module.exports = Address;
