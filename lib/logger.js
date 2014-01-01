var winston = require('winston');
//var logFile = 'app.log';

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        //new winston.transports.File({ filename: __dirname + '/../' + logFile, json: false })
    ],
    exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true }),
        //new winston.transports.File({ filename: __dirname + '/../' + logFile, json: false })
    ],
    exitOnError: false
});

module.exports = logger;

// vim: ft=javascript sw=4 sts=4 et:
