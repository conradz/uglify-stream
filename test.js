var uglify = require('./');
var bl = require('bl');
var test = require('tap').test;

test('compress js code', function(t) {
    var src = [
        '(function() {',
        '  function test() {',
        '    doTest(\'foo\');',
        '  }',
        '  return test();',
        '})();'
    ].join('\n');

    var stream = uglify();
    stream.pipe(bl(done));
    stream.end(src);

    function done(err, result) {
        var value = null;
        var doTest = function(v) { value = v; };

        t.error(err);

        result = result.toString();
        t.notEqual(result, src);

        eval(result);
        t.equal(value, 'foo');
        t.end();
    }
});
