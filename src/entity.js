'use strict';

var Entity = function(entity, popolo) {
  this._popolo = popolo || {};
  this._setKeys(entity || {});
};

Entity.prototype.eql = function(entity) {
  return entity instanceof Entity && entity.id === this.id;
};

Entity.prototype.identifier = function(type) {
  return this._find(this.identifiers, 'scheme', 'identifier', type);
};

Entity.prototype._setKeys = function(entity) {
  var self = this;
  Object.keys(entity).forEach(function (key) {
    self[key] = entity[key];
  });

  this.identifiers = this.identifiers || [];
  this.wikidata = this.identifier('wikidata');
};

Entity.prototype._find = function(list, type_key, value_key, type) {
  var found = list.find(function(item) {
    return item[type_key] && item[type_key] === type;
  });

  if (found) {
    return found[value_key];
  }
};

module.exports = Entity;
