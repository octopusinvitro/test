'use strict';

describe('Entity', function() {
  var
    Entity = require('../src/entity'),
    identifier = { identifier: 'Q0000000', scheme: 'wikidata' },
    entity = new Entity({ id: 'entity_id', identifiers: [identifier] }, null),
    object = new Entity({ id: 'entity_id' }, null);

  it('sets popolo argument ', function() {
    expect(entity.popolo).toEqual({});
  });

  it('sets keys from the entity it wraps', function() {
    expect(entity.id).toEqual('entity_id');
  });

  it('can get a property value using the brackets operator', function() {
    expect(entity['id']).toEqual('entity_id');
  });

  it('can ask itself if it has a key', function() {
    expect(entity.hasOwnProperty('id')).toBe(true);
  });

  it('can compare itself with another object', function() {
    expect(entity.eql(object)).toBe(true);
  });

  it('has identifiers', function() {
    expect(object.identifiers).toEqual([]);
    expect(entity.identifiers.length).toEqual(1);
    expect(entity.identifiers[0]).toEqual(identifier);
  });

  it('has an identifier of a type', function() {
    expect(entity.identifier('wikidata')).toEqual('Q0000000');
  });

  it('has a wikidate identifier', function() {
    expect(object.wikidata).toBeUndefined();
    expect(entity.wikidata).toEqual('Q0000000');
  });
});
