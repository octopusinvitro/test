'use strict';

var PopoloEvent, Election;

PopoloEvent = require('./event');

Election = function(data, popolo) {
  PopoloEvent.apply(this, [data, popolo]);
};

Election.prototype = Object.create(PopoloEvent.prototype);
Election.prototype.constructor = Election;

module.exports = Election;
