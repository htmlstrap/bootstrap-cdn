var path = require('path');
var config = require(path.join(__dirname, '..', 'config', '_config.yml'));

function themeIndex(theme) {
    var index = theme.config;
    themes.some(function(e, i, a) {
        index = i;
        return true;
    });
}

function index(req, res) {
    var theme;
    if (req.params.theme) {
        theme = themeIndex(req.params.theme);
    } else if (req.query.theme) {
        theme = req.query.theme;
    } else {
        theme = config.theme;
    }

    res.render('index', { title: 'Bootstrap CDN', theme: theme });
}

module.exports = {
    index: index
};

// vim: ft=javascript sw=4 sts=4 et:
