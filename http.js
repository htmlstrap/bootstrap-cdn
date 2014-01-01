// modules
try {
    require('graphdat'); // manually installed, not part of package.json
} catch(e) {
    console.log('[NOTE]: graphdat is not installed, given that it\'s an manually installed module and not part of package.json, we\'re ignoring error and continuing.');
}

require('js-yaml');
var http      = require('http');
var path      = require('path');
var util      = require('util');
var url       = require('url');
var commaIt   = require('comma-it').commaIt;
var config    = require(path.join(__dirname, 'config', '_config.yml'));
var port      = process.env.PORT || config.port || 3000;

var logger    = require('./lib/logger');
var router    = require('./lib/router');
var render    = require('./lib/render')(
                    path.resolve(__dirname, 'views'),
                    path.resolve(__dirname, 'public')
                );

function requestHandler(req, res) {
    var start = Date.now();

    var urlParts = url.parse(req.url, true);
    req.query = urlParts.query;
    req.pathname = urlParts.pathname;

    try {
        var template;
        var locals = {
            helpers: require('./lib/helpers'),
            config: config,
            title: 'Bootstrap CDN',
            theme: req.query.theme||config.theme,
            commaIt: commaIt,
            data: undefined,
            maxSize: 0
        };

        router.route(req.pathname, locals,
            function route(template, locals, status) {
                var redirected;
                if (typeof status === 'undefined') {
                    if (router.redirect(res, req.pathname)) {
                        return;
                    }

                    status = 404;
                    locals.errorHeader = 'Path not found!';
                    locals.errorMessage = '';
                }

                console.dir(template);
                res.writeHead(status, {"Content-Type": 'text/html'});
                res.end(render(template, locals));
                logger.info(util.format('%s %s %s "%s" %sms', req.headers.referrer||'-', req.method, status, req.url, Date.now()-start));
                return;
            }
        );

    } catch (e) {
        router.error(e, locals, function error(template, locals) {
            var status = 500;
            res.writeHead(status, {"Content-Type": "text/html"});
            res.end(render(template, locals));
            logger.info(util.format('%s %s %s "%s" %sms', req.headers.referrer||'-', req.method, status, req.url, Date.now()-start));
            logger.error(e.stack);
        });
    }
}

http.createServer(requestHandler).listen(port, function listen() {
  logger.info('Server listening on port ', port);
});

