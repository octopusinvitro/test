'use strict';

describe('Collection', function() {
  var
    Collection = require('../src/collection'),
    collection = new Collection(null, null);

  it('sets datalist argument', function() {
    expect(collection.datalist).toEqual([]);
  });

  it('sets popolo argument', function() {
    expect(collection.popolo).toEqual({});
  });

  it('sets the indexes', function() {
    expect(collection.indexes).toEqual({});
  });
});

