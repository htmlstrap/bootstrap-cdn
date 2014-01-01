var jade = require('jade');
var path = require('path');
var renderCache = {};

module.exports = function binding(views) {
    return function render(template, locals, callback) {
        //console.dir(views);
        //console.dir(template);
        template = path.resolve(views, template);

        if (!template.match(/\.jade$/)) {
            template += '.jade';
        }

        if (renderCache[template]) {
            return renderCache[template];
        }

        if (typeof locals === 'function') {
            callback = locals;
            locals = {};
        }

        var options = locals;
            options.filename = template;

        renderCache[template] = jade.renderFile(template, options);
        return renderCache[template];
    };
};

// vim: ft=javascript sw=4 sts=4 et:
