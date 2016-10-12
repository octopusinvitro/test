'use strict';

var fs, Popolo;

fs = require('fs');
Popolo = Popolo || {};

Popolo.read = function(path) {
  return JSON.parse(fs.readFileSync(path, 'utf-8'));
};

module.exports = Popolo;
