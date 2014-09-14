var through = require('through2');
var concat = require('concat-stream');
var writeonly = require('../');

module.exports = function (cb) {
    var stream = through(function (buf, enc, next) {
        this.push(buf.toString('utf8').toUpperCase());
        next();
    });
    stream.pipe(concat(cb));
    return writeonly(stream);
};
