'use strict';

describe('Area', function() {
  var
    Popolo = require('../index'),
    Entity = require('../src/entity'),
    Area = require('../src/area'),
    area = new Area({ id: 'an_area', name: 'An Area' }, null),

    estonia = Popolo.read('spec/fixtures/estonia.json'),
    tartu = estonia.areas.list[0];

  it('is an entity', function() {
    expect(tartu instanceof Entity).toBe(true);
    expect(tartu instanceof Area).toBe(true);
  });

  it('has the right constructor', function() {
    expect(tartu.constructor).toEqual(Area);
    expect(tartu.constructor).not.toEqual(Entity);
  });

  it('has an id', function() {
    expect(tartu.id).toEqual('area/tartu_linn');
  });

  it('has a name', function() {
    expect(tartu.name).toEqual('Tartu linn');
  });

  it('has a type', function() {
    expect(area.type).toBeUndefined();
    expect(tartu.type).toEqual('constituency');
  });

  it('has other names', function() {
    var other_name = {
      lang: 'fr',
      name: 'Dixième circonscription législative d\'Estonie',
      note: 'multilingual'
    };
    expect(area.other_names).toEqual([]);
    expect(tartu.other_names.length).toEqual(3);
    expect(tartu.other_names[0]).toEqual(other_name);
  });

  it('has identifiers', function() {
    var identifier = { identifier: 'Q3032626', scheme: 'wikidata' };
    expect(area.identifiers).toEqual([]);
    expect(tartu.identifiers.length).toEqual(1);
    expect(tartu.identifiers[0]).toEqual(identifier);
  });

  it('has an identifier of a type', function() {
    expect(tartu.identifier('wikidata')).toEqual('Q3032626');
  });

  it('has a wikidate identifier', function() {
    expect(area.wikidata).toBeUndefined();
    expect(tartu.wikidata).toEqual('Q3032626');
  });
});
