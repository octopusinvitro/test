'use strict';

var Entity, Organization;

Entity = require('./entity');

Organization = function(data, popolo) {
  Entity.apply(this, [data, popolo]);

  this.links = this.links || [];
  this.other_names = this.other_names || [];

  this.associated_colour = this.srgb;
  this.associated_color = this.srgb;
};

Organization.prototype = Object.create(Entity.prototype);
Organization.prototype.constructor = Organization;

Organization.prototype.link = function(type) {
  return this._find(this.links, 'note', 'url', type);
};

module.exports = Organization;
