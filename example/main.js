var uc = require('./uc.js');
process.stdin.pipe(uc(function (body) {
    console.log(body.toString('utf8'));
}));
