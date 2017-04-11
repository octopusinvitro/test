'use strict';

var Collection, Elections, Election;

Collection = require('./collection');
Election = require('./election');

Elections = function(datalist, popolo) {
  Collection.apply(this, [datalist, popolo]);
};

Elections.prototype = Object.create(Collection.prototype);
Elections.prototype.constructor = Elections;
Elections.prototype.entityClass = Election;

module.exports = Elections;
