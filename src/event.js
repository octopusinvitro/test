'use strict';

var Entity, PopoloEvent;

Entity = require('./entity');

PopoloEvent = function(data, popolo) {
  Entity.apply(this, [data, popolo]);
  this.identifiers = this.identifiers || [];
};

PopoloEvent.prototype = Object.create(Entity.prototype);
PopoloEvent.prototype.constructor = PopoloEvent;

module.exports = PopoloEvent;
