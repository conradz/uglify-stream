# uglify-stream

[![NPM](http://img.shields.io/npm/v/uglify-stream.svg)](https://npmjs.org/packages/uglify-stream)
[![Build Status](http://img.shields.io/travis/conradz/uglify-stream.svg)](https://travis-ci.org/conradz/uglify-stream)

Transform stream for UglifyJS

## Example

```js
var fs = require('fs');
var uglify = require('uglify-stream');

fs.createReadStream('input.js')
    .pipe(uglify())
    .pipe(fs.createWriteStream('output.js'));
```

## API

```js
uglifyStream([opts])
```

Creates a duplex stream that will compress all JS code piped into it with
UglifyJS.

### Options

 * `compress`: Set to `false` to disable compression
 * `mangle`: Set to `false` to disable name mangling
 * `uglify`: Pass in an `uglify-js` module with a `minify()` function.
   By default, `uglify-js@3` is used.
   With this option you can use `uglify-es` instead.

All uglify-js options are supported, see [its documentation](https://github.com/mishoo/UglifyJS2#minify-options).

## Example: compress browserify bundle

Using a transform stream makes it very simple to compress the bundle output
from [Browserify](https://github.com/substack/node-browserify):

```js
var browserify = require('browserify');
var uglify = require('uglify-stream');
var bl = require('bl');

var b = browserify('my-file.js')
    .bundle()
    .pipe(uglify())
    .pipe(bl(done));

function done(err, src) {
    console.log(src.toString());
}
```

## Example: Minifying ES2015+ code

```js
var fromString = require('from2-string');
var uglify = require('uglify-stream');
var bl = require('bl');

fromString(`
  const fn = (...args) => {
    return args.map(x => x ** 2);
  };
`)
    .pipe(uglify({ uglify: require('uglify-es') }))
    .pipe(bl(done));

function done(err, src) {
    console.log(src.toString());
}
```
