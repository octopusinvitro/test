'use strict';

describe('Areas', function() {
  var
    Popolo = require('../index'),
    Collection = require('../src/collection'),
    Areas = require('../src/areas'),
    Area = require('../src/area'),
    areas, tartu,

    estonia = Popolo.read('spec/fixtures/estonia.json'),
    valdkondades = estonia.areas;

  it('is a collection', function() {
    expect(valdkondades instanceof Collection).toBe(true);
    expect(valdkondades instanceof Areas).toBe(true);
  });

  it('has the right constructor', function() {
    expect(valdkondades.constructor).toEqual(Areas);
    expect(valdkondades.constructor).not.toEqual(Collection);
  });

  it('sets the entity class correctly', function() {
    expect(valdkondades.entityClass).toEqual(Area);
    expect(valdkondades.list[0] instanceof Area).toBe(true);
  });

  it('has a list of areas', function() {
    areas = new Areas(null, null);
    expect(areas.list).toEqual([]);
    expect(valdkondades.list.length).toEqual(2);
  });

  it('can find several areas from an attribute', function() {
    areas = valdkondades.where({type: 'constituency'});
    expect(areas.list.length).toEqual(2);
    expect(areas.list).toContain(valdkondades.list[0]);
    expect(areas.list).toContain(valdkondades.list[1]);
    expect(areas.list).not.toContain(valdkondades.list[2]);
  });

  it('can find a single area from a unique attribute', function() {
    tartu = valdkondades.findBy({id: 'area/tartu_linn'});
    expect(tartu.name).toEqual('Tartu linn');
  });

  it('returns the first result from a non-unique attribute', function() {
    tartu = valdkondades.findBy({type: 'constituency'});
    expect(tartu.name).toEqual('Tartu linn');
  });

  it('can find a single area from several attributes', function() {
    tartu = valdkondades.findBy({name: 'Tartu linn', type: 'constituency'});
    expect(tartu.id).toEqual('area/tartu_linn');
  });

  it('detects no items found', function() {
    var noarea = valdkondades.findBy({name: 'Sparta'});
    expect(noarea).toBeNull();
  });
});
