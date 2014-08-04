var duplexify = require('duplexify');
var spawn = require('child_process').spawn;
var binPath = require.resolve('uglify-js/bin/uglifyjs');

module.exports = uglify;

function uglify(opts) {
    opts = opts || {};

    var args = [binPath];
    if (opts.compress !== false)
        args.push('-c');
    if (opts.mangle !== false)
        args.push('-m');
    args.push('-');

    var proc = spawn(process.execPath, args, { stdio: 'pipe' });
    return duplexify(proc.stdin, proc.stdout);
}
