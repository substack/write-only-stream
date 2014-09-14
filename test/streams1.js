var test = require('tape');
var writeonly = require('../');
var through = require('through');
var concat = require('concat-stream');

test('writeonly', function (t) {
    t.plan(2);
    
    var stream = through();
    stream.pipe(concat(function (body) {
        t.equal(body.toString('utf8'), 'woo');
    }));
    
    t.throws(function () {
        wo.read();
    });
    
    var wo = writeonly(stream);
    wo.end('woo');
});
