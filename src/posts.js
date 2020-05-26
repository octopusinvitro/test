'use strict';

var Collection, Posts, Post;

Collection = require('./collection');
Post = require('./post');

Posts = function(datalist, popolo) {
  Collection.apply(this, [datalist, popolo]);
};

Posts.prototype = Object.create(Collection.prototype);
Posts.prototype.constructor = Posts;
Posts.prototype.entityClass = Post;

module.exports = Posts;
