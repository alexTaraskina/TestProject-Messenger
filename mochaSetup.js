// eslint-disable-next-line
const { JSDOM } = require('jsdom');
// eslint-disable-next-line
const Handlebars = require('handlebars');
const fs = require('fs');

const { window } = new JSDOM('<main id="app"></main>', {
    url: 'http://localhost:3000',
});

global.window = window;
global.document = window.document;

require.extensions['.hbs'] = function (module, filename) {
    const stringTemplate = fs.readFileSync(filename, 'utf-8');
    // eslint-disable-next-line
    module.exports = stringTemplate;
};

require.extensions['.css'] = function () {
    module.exports = {};
};
