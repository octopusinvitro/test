'use strict';

describe('Organization', function() {
  var
    Popolo = require('../index'),
    Entity = require('../src/entity'),
    Organization = require('../src/organization'),
    organization = new Organization(null, null),

    estonia = Popolo.read('spec/fixtures/estonia.json'),
    ekre = new Organization(estonia.organizations[1], estonia),
    riigikogu = new Organization(estonia.organizations[2], estonia),

    ireland = Popolo.read('spec/fixtures/ireland.json'),
    sinnfein = new Organization(ireland.organizations[0], ireland);

  it('is an entity', function() {
    expect(ekre instanceof Entity).toBe(true);
    expect(ekre instanceof Organization).toBe(true);
  });

  it('has the right constructor', function() {
    expect(ekre.constructor).toEqual(Organization);
    expect(ekre.constructor).not.toEqual(Entity);
  });

  it('has an id', function() {
    expect(organization.id).toBeUndefined();
    expect(ekre.id).toEqual('EKRE');
  });

  it('has a name', function() {
    expect(ekre.name).toEqual('Eesti Konservatiivse Rahvaerakonna fraktsioon');
  });

  it('has an image', function() {
    expect(ekre.image).toEqual('https://upload.wikimedia.org/wikipedia/commons/0/0c/EKRE_logo.png');
  });

  it('has links', function() {
    organization = new Organization(null, null);
    expect(organization.links).toEqual([]);
    expect(ekre.links.length).toEqual(1);
  });

  describe('link', function() {
    it('has a link of a type', function() {
      expect(ekre.link('website')).toEqual('http://www.ekre.ee/');
    });

    it('returns nothing if no type', function() {
      expect(ekre.link('foo')).toBeUndefined();
    });

    it('returns nothing if links have no note property', function() {
      organization = new Organization({ links: [{url: 'foo'}] }, null);
      expect(organization.link('Foo')).toBeUndefined();
    });

    it('returns nothing if links have no url property', function() {
      organization = new Organization({ links: [{note: 'Foo'}] }, null);
      expect(organization.link('Foo')).toBeUndefined();
    });
  });

  it('has other names', function() {
    var other_name = {
      lang: 'et',
      name: 'Eesti Konservatiivne Rahvaerakond',
      note: 'multilingual'
    };
    expect(organization.other_names).toEqual([]);
    expect(ekre.other_names.length).toEqual(3);
    expect(ekre.other_names[0]).toEqual(other_name);
  });

  it('has identifiers', function() {
    var identifier = { identifier: 'Q794028', scheme: 'wikidata' };
    expect(organization.identifiers).toEqual([]);
    expect(ekre.identifiers.length).toEqual(1);
    expect(ekre.identifiers[0]).toEqual(identifier);
  });

  it('has an identifier of a type', function() {
    expect(ekre.identifier('wikidata')).toEqual('Q794028');
  });

  it('has a wikidate identifier', function() {
    expect(organization.wikidata).toBeUndefined();
    expect(ekre.wikidata).toEqual('Q794028');
  });

  // TODO: this should be pushed into a Legislature class when we split
  // this into Party and Legislature classes
  it('has a seats', function() {
    expect(organization.seats).toBeUndefined();
    expect(riigikogu.seats).toEqual(101);
  });

  it('has an srgb', function() {
    expect(ekre.srgb).toBeUndefined();
    expect(sinnfein.srgb).toEqual('008800');
  });

  it('has aliases for srgb', function() {
    expect(sinnfein.associated_colour).toEqual('008800');
    expect(sinnfein.associated_color).toEqual('008800');
  });
});
