'use strict';

var Entity = function(data, popolo) {
  this.data = data || {};
  this.popolo = popolo || {};
  this._setKeys(data || {});

  this.identifiers = this.identifiers || [];
  this._setWikidata();
};

Entity.prototype.eql = function(entity) {
  return entity instanceof Entity && entity.id === this.id;
};

Entity.prototype.identifier = function(type) {
  return this._find(this.identifiers, 'scheme', 'identifier', type);
};

Entity.prototype._setKeys = function(data) {
  var self = this;
  Object.keys(data).forEach(function (key) {
    self[key] = data[key];
  });
};

Entity.prototype._find = function(list, type_key, value_key, type) {
  var found = list.find(function(item) {
    return item[type_key] && item[type_key] === type;
  });
  if (found) {
    return found[value_key];
  }
};

Entity.prototype._setWikidata = function() {
  var value = this.identifier('wikidata');
  if (value) {
    this['wikidata'] = value;
  }
};

module.exports = Entity;
