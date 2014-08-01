var duplexify = require('duplexify');
var spawn = require('child_process').spawn;
var binPath = require.resolve('uglify-js/bin/uglifyjs');

module.exports = uglify;

function uglify() {
    var proc = spawn(
        process.execPath,
        [binPath, '-c', '-m', '-'],
        { stdio: 'pipe' });
    return duplexify(proc.stdin, proc.stdout);
}
