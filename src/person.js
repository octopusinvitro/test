'use strict';

var Entity, Person;

Entity = require('./entity');

Person = function(data, popolo) {
  Entity.apply(this, [data, popolo]);

  this.links = this.links || [];
  this.contact_details = this.contact_details || [];
  this.images = this.images || [];
  this.other_names = this.other_names || [];

  this._setContactKey('phone');
  this._setContactKey('fax');
  this._setContactKey('twitter');
  this._setContactKey('facebook');
  this.sort_name = this.name;
  this.memberships = this._findMemberships() || [];
  this.sources = this._findSources() || [];
};

Person.prototype = Object.create(Entity.prototype);
Person.prototype.constructor = Person;

Person.prototype.link = function(type) {
  return this._find(this.links, 'note', 'url', type);
};

Person.prototype.contact = function(type) {
  return this._find(this.contact_details, 'type', 'value', type);
};

Person.prototype.nameAt = function(date) {
  var historicNames, namesAtDate, noHistoricNames;

  historicNames = this.other_names.filter(function(nameObject) {
    return nameObject.hasOwnProperty('end_date');
  });

  namesAtDate = historicNames.filter(function(nameObject) {
    return nameObject.end_date >= date && (nameObject.start_date || '0000-00-00') <= date;
  });

  noHistoricNames = this.other_names.length === 0 ||
                    historicNames.length === 0 ||
                    namesAtDate.length === 0;

  function tooManyNamesMessage(date, list) {
    var names = list.map(function(item) {
      return item.name;
    });
    return 'Too many names at ' + date + ': ' + names;
  }

  if (noHistoricNames) return this.name;
  if (namesAtDate.length > 1) throw new Error(tooManyNamesMessage(date, namesAtDate));
  return namesAtDate[0].name;
};

Person.prototype._setContactKey = function(key) {
  var value = this.contact(key) || this.link(key);
  if (value) {
    this[key] = value;
  }
};

Person.prototype._findMemberships = function() {
  var self = this;
  return (self.popolo.memberships || []).filter(function(membership) {
    return membership.person_id === self.id;
  });
};

Person.prototype._findSources = function() {
  var sources = this.memberships.map(function(membership) {
    return membership.sources;
  });
  return [].concat.apply([], sources);
};

module.exports = Person;
