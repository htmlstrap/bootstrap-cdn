module.exports = function index(locals, callback) {
    locals.tweets = require('../config/_tweets.yml');
    callback('index', locals, 200);
};

// vim: ft=javascript sw=4 sts=4 et:
