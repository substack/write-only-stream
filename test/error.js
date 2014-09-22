var test = require('tape');
var writeonly = require('../');
var through = require('through2');
var concat = require('concat-stream');

test('forward errors', function (t) {
    t.plan(2);
    
    var stream = through();
    stream.pipe(concat(function (body) {
        t.equal(body.toString('utf8'), 'woo');
    }));
    
    var wo = writeonly(stream);
    wo.on('error', function (err) {
        t.equal(err.message, 'yo');
    });
    stream.emit('error', new Error('yo'));
    wo.end('woo');
});
