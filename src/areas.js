'use strict';

var Collection, Areas, Area;

Collection = require('./collection');
Area = require('./area');

Areas = function(datalist, popolo) {
  Collection.apply(this, [datalist, popolo]);
};

Areas.prototype = Object.create(Collection.prototype);
Areas.prototype.constructor = Areas;
Areas.prototype.entityClass = Area;

module.exports = Areas;
