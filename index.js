'use strict';

var fs, Popolo;

fs = require('fs');
Popolo = Popolo || {};

Popolo.read = function(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  } catch (e) {
    return {};
  }
};

module.exports = Popolo;
