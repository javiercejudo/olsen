/*jshint node:true */

'use strict';

/**
 * Returns a two of a kind check
 *
 * @param {*} a
 * @param {*} b
 *
 * @return {Function} [description]
 */
module.exports = function olsen(a, b) {
  /**
   * Two of a kind check
   *
   * @param {Function} function to compare against
   *
   * @return {Boolean}
   */
  return function check(kind) {
    return kind(a) === kind(b);
  };
};
