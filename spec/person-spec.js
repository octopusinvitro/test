describe('Person', function() {
  var
    Popolo = require('../index'),
    Person = require('../src/person'),

    spain = Popolo.read('spec/fixtures/spain.json'),
    person = new Person(spain.persons[0], spain);

  it('has a name', function() {
    expect(person.name).toEqual('María José García-Pelayo Jurado');
  });

  it('has an email', function() {
    expect(person.email).toEqual('mj.garciapelayo@congreso.es');
  });

  it('has an image', function() {
    expect(person.image).toEqual('http://www.congreso.es/wc/htdocs/web/img/diputados/32_11.jpg');
  });

  it('has a gender', function() {
    expect(person.gender).toEqual('female');
  });

  it('has a national identity', function() {
    expect(person.national_identity).toEqual(undefined);
  });

  it('has a summary', function() {
    expect(person.summary).toEqual(undefined);
  });

  it('has a birth date', function() {
    expect(person.birth_date).toEqual('1968-01-08');
  });

  it('has a death date', function() {
    expect(person.death_date).toEqual(undefined);
  });

  it('has a honorific prefix', function() {
    expect(person.honorific_prefix).toEqual(undefined);
  });

  it('has a honorific suffix', function() {
    expect(person.honorific_suffix).toEqual(undefined);
  });

  it('has links', function() {
    expect(person.links.length).toEqual(2);
  });

  describe('link', function() {
    it('has a link of a type', function() {
      expect(person.link('Wikipedia (es)'))
        .toEqual('https://es.wikipedia.org/wiki/María_José_García-Pelayo_Jurado');
      expect(person.link('Wikipedia (fr)'))
        .toEqual('https://fr.wikipedia.org/wiki/María_José_García-Pelayo_Jurado');
    });

    it('returns nothing if no type', function() {
      expect(person.link('foo')).toEqual(undefined);
    });

    it('returns nothing if links have no note property', function() {
      var newPerson = new Person({ links: [{url: 'foo'}] }, null);
      expect(newPerson.link('Foo')).toEqual(undefined);
    });

    it('returns nothing if links have no url property', function() {
      var newPerson = new Person({ links: [{note: 'Foo'}] }, null);
      expect(newPerson.link('Foo')).toEqual(undefined);
    });
  });

  it('has contact details', function() {
    expect(person.contact_details.length).toEqual(1);
  });

  describe('contact', function() {
    it('has a contact of a type', function() {
      expect(person.contact('email')).toEqual('mj.garciapelayo@congreso.es');
    });

    it('returns nothing if no type', function() {
      expect(person.contact('foo')).toEqual(undefined);
    });

    it('returns nothing if contacts have no type property', function() {
      var newPerson = new Person({ contact_details: [{value: 'foo'}] }, null);
      expect(newPerson.contact('Foo')).toEqual(undefined);
    });

    it('returns nothing if contacts have no value property', function() {
      var newPerson = new Person({ contact_details: [{type: 'Foo'}] }, null);
      expect(newPerson.contact('Foo')).toEqual(undefined);
    });
  });

  it('has a phone', function() {
    var newPerson = new Person({ contact_details: [{phone: '123456789'}] }, null);
    expect(newPerson.phone).toEqual('123456789');
  });
});

// require 'test_helper'
//
// class PersonTest
//   def estonia_fixture
//     'test/fixtures/estonia-ep-popolo-v1.0.json'
//   end
//
//   def pakistan_fixture
//     'test/fixtures/pakistan-ep-popolo-v1.0.json'
//   end
//
//   def burundi_fixture
//     'test/fixtures/burundi-ep-popolo-v1.0.json'
//   end
//
//   def zimbabwe_fixture
//     'test/fixtures/zimbabwe-senate-ep-popolo-v1.0.json'
//   end
//
//   def people
//     @ppl ||= Everypolitician::Popolo.read(estonia_fixture).persons
//   end
//
//   def pakistan_people
//     @pakistan_ppl ||= Everypolitician::Popolo.read(pakistan_fixture).persons
//   end
//
//   def burundi_people
//     @burundi_ppl ||= Everypolitician::Popolo.read(burundi_fixture).persons
//   end
//
//   def zimbabwe_people
//     @zimbabwe_ppl ||= Everypolitician::Popolo.read(zimbabwe_fixture).persons
//   end
//
//   def aadu
//     people.find_by(name: 'Aadu Must')
//   end
//
//   def taavi
//     people.find_by(name: 'Taavi Rõivas')
//   end
//
//   def eiki
//     people.find_by(name: 'Eiki Nestor')
//   end
//
//   def etti
//     people.find_by(name: 'Etti Kagarov')
//   end
//
//   def aaisha
//     pakistan_people.find_by(name: 'Aaisha Gulalai')
//   end
//
//   def ahishakiye
//     burundi_people.find_by(name: 'AHISHAKIYE Gloriose')
//   end
//
//   def agnes
//     zimbabwe_people.find_by(name: 'Agnes Sibanda')
//   end
//
//   def test_id_attribute
//     assert_equal '6b71eefc-413d-4db6-88f0-d7ff845ebaf1', taavi[:id]
//   end
//
//   def test_id_method
//     assert_equal '6b71eefc-413d-4db6-88f0-d7ff845ebaf1', taavi.id
//   end
//
//   def test_name
//     assert_equal 'Taavi Rõivas', taavi.name
//     assert_equal 'Taavi Rõivas', taavi.name_at('2015-01-01')
//   end
//
//   def test_twitter
//     assert_equal 'taaviroivas', taavi.twitter
//     assert_equal nil, eiki.twitter
//   end
//
//   def test_facebook
//     assert_equal 'https://facebook.com/100000658185044', eiki.facebook
//     assert_equal nil, taavi.facebook
//   end
//
//   # TODO: switch this test to be against live data
//   def test_name_at
//     person = Everypolitician::Popolo::Person.new(
//       name:        'Bob',
//       other_names: [
//         { name: 'Robert', start_date: '1989-01-01', end_date: '1999-12-31' },
//       ]
//     )
//     assert_equal 'Robert', person.name_at('1990-06-01')
//
//     person = Everypolitician::Popolo::Person.new(
//       name:        'Bob',
//       other_names: [
//         { name: 'Robert', start_date: '1989-01-01', end_date: '1999-12-31' },
//         { name: 'Bobby', start_date: '1989-01-01', end_date: '2012-12-31' },
//       ]
//     )
//
//     assert_raises Everypolitician::Popolo::Person::Error do
//       person.name_at('1996-01-01')
//     end
//   end
//
//   def test_identifier
//     assert_equal '1105987868', taavi.identifier('gnd')
//   end
//
//   def test_wikidata
//     assert_equal 'Q3785077', taavi.wikidata
//   end
//
//   def test_contacts
//     assert_equal '6316301', eiki.contact('phone')
//     assert_equal '6316301', eiki.phone
//     assert_equal nil, eiki.fax
//   end
//
//   def test_no_contacts
//     assert_equal nil, taavi.contact('phone')
//     assert_equal nil, taavi.phone
//     assert_equal nil, taavi.fax
//   end
//
//   def test_sort_name
//     assert_equal nil, taavi['sort_name']
//     assert_equal 'Taavi Rõivas', taavi.sort_name
//   end
//
//   def test_family_name
//     assert_equal 'Nestor', eiki.family_name
//   end
//
//   def test_given_name
//     assert_equal 'Eiki', eiki.given_name
//   end
//
//   def test_patronynic_name
//     assert_equal nil, eiki.patronymic_name
//     assert_equal 'd/o Shams-ul-Qayum Wazir', aaisha.patronymic_name
//   end
//
//   def test_email
//     assert_equal 'Taavi.Roivas@riigikogu.ee', taavi.email
//   end
//
//   def test_image
//     assert_equal 'http://www.riigikogu.ee/wpcms/wp-content/uploads/ems/temp/8a941c7a-8333-484b-a720-8207dee2e4cc.jpg', eiki.image
//     assert_equal nil, etti.image
//   end
//
//   def test_gender
//     assert_equal 'male', taavi.gender
//     assert_equal nil, etti.gender
//   end
//
//   def test_national_identity
//     assert_equal nil, etti.national_identity
//     assert_equal 'HUTU', ahishakiye.national_identity
//   end
//
//   def test_summary
//     assert_equal nil, etti.summary
//     assert_equal 'Bulawayo Province Member of the Senate.', agnes.summary
//   end
//
//   def test_honorific_prefix
//     assert_equal nil, taavi.honorific_prefix
//     person = Everypolitician::Popolo::Person.new(id: '123', name: 'Bob', honorific_prefix: 'Dr')
//     assert_equal 'Dr', person.honorific_prefix
//   end
//
//   def test_honorific_suffix
//     assert_equal nil, taavi.honorific_suffix
//     person = Everypolitician::Popolo::Person.new(id: '123', name: 'Bob', honorific_suffix: 'PhD')
//     assert_equal 'PhD', person.honorific_suffix
//   end
//
//   def test_memberships
//     assert_equal 2, etti.memberships.count
//     assert_equal '2014-03-27', etti.memberships.first.start_date
//   end
//
//   def test_images
//     image = { url: 'https://upload.wikimedia.org/wikipedia/commons/1/15/SDE_Eiki_Nestor.jpg' }
//     assert_equal 2, eiki.images.count
//     assert_includes eiki.images, image
//   end
//
//   def test_sources
//     source = { url: 'http://www.riigikogu.ee/riigikogu/koosseis/riigikogu-liikmed/saadik/233ac42e-573c-400e-8568-0ac3d4c107f9/Aadu-Must' }
//     assert_equal aadu.sources.first, source
//   end
//
//   def test_other_names
//     other_name = { lang: 'et', name: 'Eiki Nestor', note: 'multilingual' }
//     assert_equal 24, eiki.other_names.count
//     assert_includes eiki.other_names, other_name
//   end
//
//   def test_links
//     link = { note: 'facebook', url: 'https://facebook.com/100000658185044' }
//     assert_equal 9, eiki.links.count
//     assert_includes eiki.links, link
//   end
// end