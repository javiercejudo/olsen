# olsen

[![Build Status](https://travis-ci.org/javiercejudo/olsen.svg)](https://travis-ci.org/javiercejudo/olsen)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/olsen/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/olsen?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/olsen/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/olsen)

Two of a kind check

## Install

    npm i olsen

## Usage

In general, `olsen(x, y)(func)` ≡ `func(x) === func(y)`.

```js
var olsen = require('olsen');

olsen(1, 3)(isEven); // => true, both of kind "not even"
olsen(2, 4)(isEven); // => true, both of kind "even"

olsen(1, '1')(Number); // => true

olsen(1, 0.99999999999999999)(Number); // => true, 0.999... becomes exactly 1
olsen(1, 0.9999999999999999)(Number); // => false

olsen(0, 2 * Math.PI)(Math.cos); // => true

olsen(NaN, NaN)(function(x) {
  return x;
}); // => false, NaN !== NaN
```

See [use case](fixtures/Address.js) and [accompanying tests](test/useCase.js).
