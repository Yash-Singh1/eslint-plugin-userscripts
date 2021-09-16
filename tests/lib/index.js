const requireindex = require('requireindex');

module.exports = requireindex(__dirname.replace(/\/tests(\/lib)$/, '$1/rules'));
