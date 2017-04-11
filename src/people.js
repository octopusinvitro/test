'use strict';

var Collection, People, Person;

Collection = require('./collection');
Person = require('./person');

People = function(datalist, popolo) {
  Collection.apply(this, [datalist, popolo]);
};

People.prototype = Object.create(Collection.prototype);
People.prototype.constructor = People;
People.prototype.entityClass = Person;

module.exports = People;
