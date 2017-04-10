'use strict';

var Entity, Post;

Entity = require('./entity');

Post = function(data, popolo) {
  Entity.apply(this, [data, popolo]);
  this._organizations = this.popolo.organizations || { findBy: function() {} };
  this.organization = this._organizations.findBy({id: this.organization_id });
};

Post.prototype = Object.create(Entity.prototype);
Post.prototype.constructor = Post;

module.exports = Post;
