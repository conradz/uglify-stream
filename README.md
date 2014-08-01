# uglify-stream

Transform stream for UglifyJS

To install this module run `npm install --save uglify-stream`.

Creates a stream that will compress all JS code piped into it with UglifyJS.

```js
var fs = require('fs');
var uglify = require('uglify-stream');

fs.createReadStream('input.js')
    .pipe(uglify())
    .pipe(fs.createWriteStream('output.js'));
```

Note: UglifyJS is run in a separate process when using this module, which means
that it will not block the calling process when compressing, unlike when Uglify
is called directly from Node.

## Use with Browserify

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
