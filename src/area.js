'use strict';

var Entity, Area;

Entity = require('./entity');

Area = function(data, popolo) {
  Entity.apply(this, [data, popolo]);
  this.other_names = this.other_names || [];
};

Area.prototype = Object.create(Entity.prototype);
Area.prototype.constructor = Area;

module.exports = Area;
