'use strict';

describe('Person', function() {
  var
    Popolo = require('../index'),
    Entity = require('../src/entity'),
    Person = require('../src/person'),
    person,

    burundi = Popolo.read('spec/fixtures/burundi.json'),
    ahishakiye = new Person(burundi.persons[0], burundi),

    estonia = Popolo.read('spec/fixtures/estonia.json'),
    eiki = new Person(estonia.persons[0], estonia),
    taavi = new Person(estonia.persons[1], estonia),

    pakistan = Popolo.read('spec/fixtures/pakistan.json'),
    aaisha = new Person(pakistan.persons[0], pakistan),

    zimbabwe = Popolo.read('spec/fixtures/zimbabwe-senate.json'),
    agnes = new Person(zimbabwe.persons[0], zimbabwe);

  it('is an entity', function() {
    expect(taavi instanceof Entity).toBe(true);
    expect(taavi instanceof Person).toBe(true);
  });

  it('has the right constructor', function() {
    expect(taavi.constructor).toEqual(Person);
    expect(taavi.constructor).not.toEqual(Entity);
  });

  it('has an id', function() {
    expect(taavi.id).toEqual('6b71eefc-413d-4db6-88f0-d7ff845ebaf1');
  });

  it('has a name', function() {
    expect(eiki.name).toEqual('Eiki Nestor');
  });

  it('has an email', function() {
    expect(eiki.email).toEqual('Eiki.Nestor@riigikogu.ee');
  });

  it('has an image', function() {
    expect(eiki.image).toEqual('https://www.riigikogu.ee/wpcms/wp-content/uploads/ems/temp/8a941c7a-8333-484b-a720-8207dee2e4cc.jpg');
  });

  it('has a gender', function() {
    expect(eiki.gender).toEqual('male');
    expect(ahishakiye.gender).toEqual('female');
  });

  it('has a national identity', function() {
    expect(eiki.national_identity).toBeUndefined();
    expect(ahishakiye.national_identity).toEqual('HUTU');
  });

  it('has a summary', function() {
    expect(eiki.summary).toBeUndefined();
    expect(agnes.summary).toEqual('Bulawayo Province Member of the Senate.');
  });

  it('has a birth date', function() {
    expect(eiki.birth_date).toEqual('1953-09-05');
  });

  it('has a death date', function() {
    person = new Person({ death_date: '1000-10-01' }, null);
    expect(eiki.death_date).toBeUndefined();
    expect(person.death_date).toEqual('1000-10-01');
  });

  it('has a honorific prefix', function() {
    person = new Person({ honorific_prefix: 'Dr' }, null);
    expect(eiki.honorific_prefix).toBeUndefined();
    expect(person.honorific_prefix).toEqual('Dr');
  });

  it('has a honorific suffix', function() {
    person = new Person({ honorific_suffix: 'PhD' });
    expect(eiki.honorific_suffix).toBeUndefined();
    expect(person.honorific_suffix).toEqual('PhD');
  });

  it('has links', function() {
    expect(eiki.links.length).toEqual(9);
    expect( (new Person({}, null)).links ).toEqual([]);
  });

  describe('link', function() {
    it('has a link of a type', function() {
      expect(eiki.link('Wikipedia (et)')).toEqual('https://et.wikipedia.org/wiki/Eiki_Nestor');
    });

    it('returns nothing if no type', function() {
      expect(eiki.link('foo')).toBeUndefined();
    });

    it('returns nothing if links have no note property', function() {
      person = new Person({ links: [{url: 'foo'}] }, null);
      expect(person.link('Foo')).toBeUndefined();
    });

    it('returns nothing if links have no url property', function() {
      person = new Person({ links: [{note: 'Foo'}] }, null);
      expect(person.link('Foo')).toBeUndefined();
    });
  });

  it('has contact details', function() {
    expect(eiki.contact_details.length).toEqual(2);
    expect( (new Person({}, null)).contact_details ).toEqual([]);
  });

  describe('contact', function() {
    it('has a contact of a type', function() {
      expect(eiki.contact('email')).toEqual('Eiki.Nestor@riigikogu.ee');
    });

    it('returns nothing if no type', function() {
      expect(eiki.contact('foo')).toBeUndefined();
    });

    it('returns nothing if contacts have no type property', function() {
      person = new Person({ contact_details: [{value: 'foo'}] }, null);
      expect(person.contact('Foo')).toBeUndefined();
    });

    it('returns nothing if contacts have no value property', function() {
      person = new Person({ contact_details: [{type: 'Foo'}] }, null);
      expect(person.contact('Foo')).toBeUndefined();
    });
  });

  it('has a phone', function() {
    expect(eiki.phone).toEqual('6316301');
  });

  it('has a fax', function() {
    person = new Person({ contact_details: [{ type: 'fax', value: '1234' }] }, null);
    expect(eiki.fax).toBeUndefined();
    expect(person.fax).toEqual('1234');
  });

  describe('twitter', function() {
    it('has a twitter from contact details', function() {
      expect(eiki.twitter).toBeUndefined();
      expect(taavi.twitter).toEqual('taaviroivas');
    });

    it('has a twitter from links if not in contact details', function() {
      var links = { links: [{ note: 'twitter', url: 'https://twitter.com/taaviroivas' }] };
      person = new Person(links, null);
      expect(person.twitter).toEqual('https://twitter.com/taaviroivas');
    });
  });

  describe('facebook', function() {
    it('has a facebook from contact details', function() {
      person = new Person({ contact_details: [{ type: 'facebook', value: 'username' }] }, null);
      expect(person.facebook).toEqual('username');
    });

    it('has a facebook from links if not in contact details', function() {
      expect(eiki.facebook).toEqual('https://facebook.com/100000658185044');
    });
  });

  it('has a sort name', function() {
    expect(eiki.sort_name).toEqual('Eiki Nestor');
  });

  it('has a family name', function() {
    expect(eiki.family_name).toEqual('Nestor');
  });

  it('has a given name', function() {
    expect(eiki.given_name).toEqual('Eiki');
  });

  it('has a patronymic name', function() {
    expect(eiki.patronymic_name).toBeUndefined();
    expect(aaisha.patronymic_name).toEqual('d/o Shams-ul-Qayum Wazir');
  });

  it('has identifiers', function() {
    var identifier = {
      identifier: '81aecc23-8483-48d6-9217-289fce86b1b5',
      scheme: 'everypolitician_legacy'
    };
    expect(eiki.identifiers.length).toEqual(6);
    expect(eiki.identifiers[0]).toEqual(identifier);
    expect( (new Person({}, null)).identifiers ).toEqual([]);
  });

  it('has an identifier of a type', function() {
    expect(taavi.identifier('gnd')).toEqual('1105987868');
  });

  it('has a wikidate identifier', function() {
    expect(taavi.wikidata).toEqual('Q3785077');
  });

  it('has images', function() {
    var image = { url: 'https://www.riigikogu.ee/wpcms/wp-content/uploads/ems/temp/8a941c7a-8333-484b-a720-8207dee2e4cc.jpg'};
    expect(eiki.images.length).toEqual(2);
    expect(eiki.images[0]).toEqual(image);
    expect( (new Person({}, null)).images ).toEqual([]);
  });

  it('has other names', function() {
    var name = { lang: 'ca', name: 'Eiki Nestor', note: 'multilingual' };
    expect(eiki.other_names.length).toEqual(3);
    expect(eiki.other_names[0]).toEqual(name);
    expect( (new Person({}, null)).other_names ).toEqual([]);
  });

  it('has memberships', function() {
    expect(eiki.memberships.length).toEqual(2);
    expect(eiki.memberships[0].person_id).toEqual(eiki.id);
    expect( (new Person(null, null)).memberships ).toEqual([]);
  });

  it('has sources', function() {
    var source = { url: 'https://www.riigikogu.ee/riigikogu/koosseis/riigikogu-liikmed/saadik/81aecc23-8483-48d6-9217-289fce86b1b5/Eiki-Nestor' };
    expect(eiki.sources.length).toEqual(2);
    expect(eiki.sources[0]).toEqual(source);
    expect( (new Person(null, null)).sources ).toEqual([]);
  });

  describe('when asking for the name at a date', function() {
    it('knows the name at a specific date', function() {
      expect(taavi.nameAt('2015-01-01')).toEqual('Taavi Rõivas');
    });

    it('returns the name if no other names', function() {
      expect( (new Person({ name: 'name' }, null)).nameAt('2015-01-01') ).toEqual('name');
    });

    it('returns the name if no historic names', function() {
      var name = { lang: 'en', name: 'Dummy Name', note: 'multilingual' };
      person = { name: 'name', other_names: [name] };
      expect( (new Person(person, null)).nameAt('2015-01-01') ).toEqual('name');
    });

    it('returns the name if no historic names in the right period', function() {
      var name = { lang: 'en', name: 'Dummy Name', end_date: '2014-01-01'};
      person = { name: 'name', other_names: [name] };
      expect( (new Person(person, null)).nameAt('2015-01-01') ).toEqual('name');
    });

    it('returns the right name if historic names in the right period', function() {
      var name1 = { lang: 'en', name: 'Dummy Name 1', end_date: '2015-01-01'};
      var name2 = { lang: 'en', name: 'Dummy Name 2', end_date: '2014-01-01'};
      person = { name: 'name', other_names: [name1, name2] };
      expect( (new Person(person, null)).nameAt('2015-01-01') ).toEqual('Dummy Name 1');
    });

    it('throws an error if there is more than one name in the period', function() {
      var name1 = { lang: 'en', name: 'Dummy Name 1', end_date: '2015-01-01'};
      var name2 = { lang: 'en', name: 'Dummy Name 2', end_date: '2015-01-01'};
      person = { name: 'name', other_names: [name1, name2] };
      expect(function() {
        (new Person(person, null)).nameAt('2015-01-01');
      }).toThrow(new Error('Too many names at 2015-01-01: Dummy Name 1,Dummy Name 2'));
    });
  });
});
