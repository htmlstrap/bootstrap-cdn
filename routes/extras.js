var OK = 200;

require('js-yaml');
var oauth   = require('../lib/oauth');
var commaIt = require('comma-it').commaIt;
var fs      = require('fs');

function popular(locals, callback) {
    locals.config.extras = 'stub';
    if (locals.config.extras === 'stub') {
        console.log('YO YO YO');
        oauth.fallback(null, '../tests/stubs/popular.json', function fallback(data) {
            locals.data = data;
            console.dir(data);
            callback('extras_popular', locals, OK);
            return;
        });
    } else {
        oauth.fetch('/tmp/.popular.json', function fetch(data) {
            locals.data = data;
            callback('extras_popular', locals, OK);
            if (data && data.length !== 0) {
                fs.writeFile('/tmp/.popular.json', JSON.stringify({ data: { popularfiles: data } }, null, 2));
            }
            return;
        });
    }
    return;
}

function birthday(locals, callback) {
    callback('extras_birthday', locals, OK);
}

function app(locals, callback) {
    callback('extras_app', locals, OK);
}

module.exports = {
    popular: popular,
    birthday: birthday,
    app: app
};

// vim: ft=javascript sw=4 sts=4 et:
