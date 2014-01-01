var BAD = 404;

var redirects = require('../config/_redirects');

var routes = {
    '/': require('../routes/'),
    '/extras/app/':
         require('../routes/extras').app,
    '/extras/birthday/':
         require('../routes/extras').birthday,
    '/extras/popular/':
         require('../routes/extras').popular,
};

function defaultRoute(locals, callback) {
    callback(null, locals);
}

function redirect(source, callback) {
    var redirected = false;
    Object.keys(redirects).forEach(function(redirect) {
        if (redirect === source) {
            redirected = true;
            res.writeHead(301, { 'Location': redirects[redirect] });
            res.end();
            return;
        }
    });
    return redirected;
}

function error(err, locals, callback) {
    locals = locals || {};
    locals.errorHeader  = 'An error occured!';
    locals.errorMessage = err.stack;

    callback('error', locals);
}

function route(pathname, locals, callback) {
    locals = locals || {};

    if (!pathname.match(/\/$/)) {
        pathname += '/';
    }

    if (typeof routes[pathname] === 'function') {
        return routes[pathname](locals, callback);
    }
    return defaultRoute(locals, callback);
}

module.exports = {
    route: route,
    redirect: redirect,
    error: error
};

// vim: ft=javascript sw=4 sts=4 et:
