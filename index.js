'use strict';

var
  fs, Popolo, PopoloJSON,
  Areas,
  Organizations;

fs = require('fs');
Areas = require('./src/areas');
Organizations = require('./src/organizations');

Popolo = Popolo || {};

PopoloJSON = function(popolo) {
  this.popolo = popolo || {};
  this.areas = new Areas(popolo.areas, this);
  this.organizations = new Organizations(popolo.organizations, this);
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
