'use strict';

describe('People', function() {
  var
    Popolo = require('../index'),
    Collection = require('../src/collection'),
    People = require('../src/people'),
    Person = require('../src/person'),
    people, taavi, eiki,

    estonia = Popolo.read('spec/fixtures/estonia.json'),
    estonians = new People(estonia.persons, estonia);

  it('is a collection', function() {
    expect(estonians instanceof Collection).toBe(true);
    expect(estonians instanceof People).toBe(true);
  });

  it('has the right constructor', function() {
    expect(estonians.constructor).toEqual(People);
    expect(estonians.constructor).not.toEqual(Collection);
  });

  it('sets the entity class correctly', function() {
    expect(estonians.entityClass).toEqual(Person);
    expect(estonians.list[0] instanceof Person).toBe(true);
  });

  it('has a list of people', function() {
    people = new People(null, null);
    expect(people.list).toEqual([]);
    expect(estonians.list.length).toEqual(3);
  });

  it('can find several people from an attribute', function() {
    var males = estonians.where({gender: 'male'});
    expect(males.list.length).toEqual(2);
    expect(males.list).toContain(estonians.list[0]);
    expect(males.list).toContain(estonians.list[1]);
    expect(males.list).not.toContain(estonians.list[2]);
  });

  it('can find a single person from a unique attribute', function() {
    taavi = estonians.findBy({ id: '6b71eefc-413d-4db6-88f0-d7ff845ebaf1' });
    expect(taavi.name).toEqual('Taavi Rõivas');
  });

  it('returns the first result from a non-unique attribute', function() {
    eiki = estonians.findBy({ gender: 'male' });
    expect(eiki.name).toEqual('Eiki Nestor');
  });

  it('can find a single person from several attributes', function() {
    taavi = estonians.findBy({ birth_date: '1979-09-26', email: 'Taavi.Roivas@riigikogu.ee' });
    expect(taavi.id).toEqual('6b71eefc-413d-4db6-88f0-d7ff845ebaf1');
  });

  it('detects no items found', function() {
    var nobody = estonians.findBy({ name: 'Raavi Rõivas' });
    expect(nobody).toBeNull();
  });
});
