'use strict';

var fs = require('fs');
var Popolo = Popolo || {};

Popolo.read = function(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  } catch (e) {
    return {};
  }
};

module.exports = Popolo;
