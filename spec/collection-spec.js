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

//   def test_where_finding_on_memberships
//     mem = popolo.memberships.where(person_id: '0259486a-0410-49f3-aef9-8b79c15741a7', legislative_period_id: 'term/13')
//     assert_instance_of Everypolitician::Popolo::Memberships, mem
//     assert_equal popolo.memberships.where(person_id: '0259486a-0410-49f3-aef9-8b79c15741a7', legislative_period_id: 'term/13').count, 1
//   end
