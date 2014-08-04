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
uglify-stream([opts])
```

Creates a duplex stream that will compress all JS code piped into it with
UglifyJS. UglifyJS is run in a separate process when using this module, which
means that it will not block the calling process when compressing, unlike using
Uglify directly from Node.

### Options

 * `compress`: Set to `false` to disable compression
 * `mangle`: Set to `false` to disable name mangling

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
