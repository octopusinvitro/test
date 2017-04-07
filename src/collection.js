'use strict';

var Collection = function(datalist, popolo) {
  this.datalist = datalist || [];
  this.popolo = popolo || {};

  this.indexes = {};
};

module.exports = Collection;

