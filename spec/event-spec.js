'use strict';

describe('PopoloEvent', function() {
  var
    Popolo = require('../index'),
    Entity = require('../src/entity'),
    PopoloEvent = require('../src/event'),
    event = new PopoloEvent({ id: 'an_event', name: 'An PopoloEvent' }, null),

    estonia = Popolo.read('spec/fixtures/estonia.json'),
    term = new PopoloEvent(estonia.events[0], estonia);

  it('is an entity', function() {
    expect(term instanceof Entity).toBe(true);
    expect(term instanceof PopoloEvent).toBe(true);
  });

  it('has the right constructor', function() {
    expect(term.constructor).toEqual(PopoloEvent);
    expect(term.constructor).not.toEqual(Entity);
  });

  it('has an id', function() {
    expect(term.id).toEqual('term/12');
  });

  it('has a name', function() {
    expect(term.name).toEqual('12th Riigikogu');
  });

  it('has a classification', function() {
    expect(event.classification).toBeUndefined();
    expect(term.classification).toEqual('legislative period');
  });

  it('has identifiers', function() {
    var identifier = { identifier: 'Q967549', scheme: 'wikidata' };
    expect(event.identifiers).toEqual([]);
    expect(term.identifiers.length).toEqual(1);
    expect(term.identifiers[0]).toEqual(identifier);
  });

  it('has an identifier of a type', function() {
    expect(term.identifier('wikidata')).toEqual('Q967549');
  });

  it('has a wikidate identifier', function() {
    expect(event.wikidata).toBeUndefined();
    expect(term.wikidata).toEqual('Q967549');
  });

  it('has a start date', function() {
    expect(event.start_date).toBeUndefined();
    expect(term.start_date).toEqual('2011-03-27');
  });

  it('has an end date', function() {
    expect(event.end_date).toBeUndefined();
    expect(term.end_date).toEqual('2015-03-23');
  });

  it('has an organization id', function() {
    expect(event.organization_id).toBeUndefined();
    expect(term.organization_id).toEqual('1ba661a9-22ad-4d0f-8a60-fe8e28f2488c');
  });
});

//   def test_accessing_legislative_periods
//     terms = popolo.legislative_periods
//     assert_instance_of Everypolitician::Popolo::LegislativePeriods, terms
//     assert_equal 2, terms.count
//     term = terms.first
//     assert_instance_of Everypolitician::Popolo::LegislativePeriod, term
//     assert_equal 'term/12', term.id
//   end
//
//   def test_accessing_elections
//     elections = popolo.elections
//     assert_instance_of Everypolitician::Popolo::Elections, elections
//     assert_equal 14, elections.count
//     election = elections.first
//     assert_instance_of Everypolitician::Popolo::Election, election
//     assert_equal 'Q1891860', election.id
//   end
//
//   def test_falls_back_to_event_class
//     popolo = Everypolitician::Popolo::JSON.new(events: [{ classification: 'referendum', id: '123', foo: 'Bar' }])
//     assert_instance_of EveryPolitician::Popolo::Event, popolo.events.first
//   end
//
//   def test_term_memberships
//     term = popolo.terms.first
//     memberships = term.memberships
//     assert_equal memberships.count, 165
//     assert_instance_of EveryPolitician::Popolo::Membership, memberships.first
//     assert_equal memberships.first.person_id, '0259486a-0410-49f3-aef9-8b79c15741a7'
//     org_ids = memberships.map(&:organization_id).to_set
//     assert_equal org_ids.count, 1
//     assert_equal org_ids.first, '1ba661a9-22ad-4d0f-8a60-fe8e28f2488c'
//   end
// end
