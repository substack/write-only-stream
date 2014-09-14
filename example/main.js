var uc = require('./uc.js');
process.stdin.pipe(uc(function (body) {
    console.log(body.toString('utf8'));
})); // can't .pipe() the uc stream anywhere
