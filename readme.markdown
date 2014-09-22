# write-only-stream

wrap a readable/writable stream to be write-only
to prevent mucking up or disclosing output

[![build status](https://secure.travis-ci.org/substack/write-only-stream.png)](http://travis-ci.org/substack/write-only-stream)

# example


Suppose you have a module that uses a readable/writable stream internally but
want to expose just the writable part of that internal stream. This is common if
you use the readable side internally and expose the writable side as the
interface.

Now we can write some code like this contrived example with a `through` stream
internally for convenience:

``` js
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
```

but consumers won't be able to read from the output side:


``` js
var uc = require('./uc.js');
process.stdin.pipe(uc(function (body) {
    console.log(body.toString('utf8'));
})); // can't .pipe() the uc stream anywhere
```

# methods

``` js
var writeonly = require('write-only-stream')
```

## var wo = writeonly(stream)

Return a writable stream `wo` that wraps the readable/writable `stream` argument
given to only expose the writable side.

`stream` can be a streams1 or streams2 stream.

# install

With [npm](https://npmjs.org) do:

```
npm install write-only-stream
```

# license

MIT
