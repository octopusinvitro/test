'use strict';

var Collection = function(datalist, popolo) {
  this.datalist = datalist || [];
  this.popolo = popolo || {};

  this.indexes = {};
  this.list = this._createEntities(datalist || []);
};

Collection.prototype.findBy = function(attributes) {
  return this.where(attributes || {}).list[0] || null;
};

Collection.prototype.where = function(attributes) {
  return new this.constructor(
    this._values(this._entitiesDataFromAttributes(attributes)).sort(),
    this.popolo
  );
};

Collection.prototype._entitiesDataFromAttributes = function(attributes) {
  var self = this, entitylist;
  return Object.keys(attributes).reduce(function(memo, key) {
    self.indexes[key] = self.indexes[key] || {};
    entitylist = self.indexes[key][attributes[key]] || [];
    self._ensureNoRepeatedEntities(entitylist, memo);
    return memo;
  }, {});
};

Collection.prototype._ensureNoRepeatedEntities = function(entitylist, memo) {
  entitylist.forEach(function(entity) {
    memo[entity.id] = entity.data;
  });
};

Collection.prototype._createEntities = function(datalist) {
  var self = this, entity;
  return datalist.map(function(data) {
    entity = new self.entityClass(data, self.popolo);
    self._updateIndexes(entity);
    return entity;
  });
};

Collection.prototype._updateIndexes = function(entity) {
  var self = this;
  Object.keys(entity).forEach(function(key) {
    if (self._keyIsSimpleProperty(key, entity)) {
      self._addToIndex(key, entity);
    }
  });
};

Collection.prototype._keyIsSimpleProperty = function(key, entity) {
  return !(entity[key] instanceof Array) && !(entity[key] instanceof Object);
};

Collection.prototype._addToIndex = function(key, entity) {
  this.indexes[key] = this.indexes[key] || {};
  this.indexes[key][entity[key]] = this.indexes[key][entity[key]] || [];
  this.indexes[key][entity[key]].push(entity);
};

Collection.prototype._values = function(object) {
  return Object.keys(object).map(function(key) { return object[key]; });
};

module.exports = Collection;
