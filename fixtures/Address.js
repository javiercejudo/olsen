/*jshint node:true, mocha:true */

'use strict';

var ofAKind = require('../src/olsen');
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
];

physicalAddressProps = physicalPostcodeProps.concat([
  Address.prototype.getNumber,
  Address.prototype.getStreet
]);

equalsProps = physicalAddressProps.concat([Address.prototype.getResident]);

Address.prototype.samePhysicalPostcode = function(anotherAddress) {
  return physicalPostcodeProps
    .map(f => f.bind(this))
    .every(ofAKind(anotherAddress, this));
};

Address.prototype.samePhysicalAddress = function(anotherAddress) {
  return physicalAddressProps
    .map(f => f.bind(this))
    .every(ofAKind(anotherAddress, this));
};

Address.prototype.equals = function(anotherAddress) {
  return equalsProps
    .map(f => f.bind(this))
    .every(ofAKind(anotherAddress, this));
};

module.exports = Address;
