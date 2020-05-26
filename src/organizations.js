'use strict';

var Collection, Organizations, Organization;

Collection = require('./collection');
Organization = require('./organization');

Organizations = function(datalist, popolo) {
  Collection.apply(this, [datalist, popolo]);
};

Organizations.prototype = Object.create(Collection.prototype);
Organizations.prototype.constructor = Organizations;
Organizations.prototype.entityClass = Organization;

module.exports = Organizations;
