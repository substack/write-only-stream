var Writable = require('readable-stream/writable');

module.exports = function (stream) {
    var opts = stream._writableState;
    var compat = typeof stream._write !== 'function';
    var wo = new Writable({ objectMode: opts && opts.objectMode });
    
    wo._write = function (buf, enc, next) {
        if (compat) {
            stream.write(buf);
            next();
        }
        else stream._write(buf, enc, next);
    };
    
    wo.once('finish', function () {
        stream.end();
    });
    
    stream.on('error', function (err) {
        wo.emit('error', err);
    });
    return wo;
};
