'use strict';

describe('Elections', function() {
  var
    Popolo = require('../index'),
    Collection = require('../src/collection'),
    Elections = require('../src/elections'),
    Election = require('../src/election'),
    elections, tartu,

    estonia = Popolo.read('spec/fixtures/estonia.json'),
    valimised = new Elections(estonia.events, estonia);

  it('is a collection', function() {
    expect(valimised instanceof Collection).toBe(true);
    expect(valimised instanceof Elections).toBe(true);
  });

  it('has the right constructor', function() {
    expect(valimised.constructor).toEqual(Elections);
    expect(valimised.constructor).not.toEqual(Collection);
  });

  it('sets the entity class correctly', function() {
    expect(valimised.entityClass).toEqual(Election);
    expect(valimised.list[0] instanceof Election).toBe(true);
  });

  it('has a list of elections', function() {
    elections = new Elections(null, null);
    expect(elections.list).toEqual([]);
    expect(valimised.list.length).toEqual(3);
  });

  // it('can find several elections from an attribute', function() {
  //   elections = valimised.where({type: 'constituency'});
  //   expect(elections.list.length).toEqual(2);
  //   expect(elections.list).toContain(valimised.list[0]);
  //   expect(elections.list).toContain(valimised.list[1]);
  //   expect(elections.list).not.toContain(valimised.list[2]);
  // });
  //
  // it('can find a single area from a unique attribute', function() {
  //   tartu = valimised.findBy({ id: 'area/tartu_linn' });
  //   expect(tartu.name).toEqual('Tartu linn');
  // });
  //
  // it('returns the first result from a non-unique attribute', function() {
  //   tartu = valimised.findBy({ type: 'constituency' });
  //   expect(tartu.name).toEqual('Tartu linn');
  // });
  //
  // it('can find a single area from several attributes', function() {
  //   tartu = valimised.findBy({ name: 'Tartu linn', type: 'constituency' });
  //   expect(tartu.id).toEqual('area/tartu_linn');
  // });
  //
  // it('detects no items found', function() {
  //   var noarea = valimised.findBy({ name: 'Sparta' });
  //   expect(noarea).toBeNull();
  // });
});
