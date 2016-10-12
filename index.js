'use strict';

var fs = require('fs');
var Popolo = Popolo || {};

Popolo.read = function(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

module.exports = Popolo;
