'use strict';

var
  fs, Popolo, PopoloJSON,
  Areas;

fs = require('fs');
Areas = require('./src/areas');

Popolo = Popolo || {};

PopoloJSON = function(popolo) {
  this.popolo = popolo || {};
  this.areas = new Areas(popolo.areas, this);
  this.memberships = popolo.memberships;
  this.persons = popolo.persons;
};

Popolo.read = function(path) {
  try {
    var popolo = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return new PopoloJSON(popolo);
  } catch (e) {
    return {};
  }
};

module.exports = Popolo;
