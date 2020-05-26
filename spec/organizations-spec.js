'use strict';

describe('Organizations', function() {
  var
    Popolo = require('../index'),
    Collection = require('../src/collection'),
    Organizations = require('../src/organizations'),
    Organization = require('../src/organization'),
    organizations, irl,

    estonia = Popolo.read('spec/fixtures/estonia.json'),
    organisatsioonid = estonia.organizations;

  it('is a collection', function() {
    expect(organisatsioonid instanceof Collection).toBe(true);
    expect(organisatsioonid instanceof Organizations).toBe(true);
  });

  it('has the right constructor', function() {
    expect(organisatsioonid.constructor).toEqual(Organizations);
    expect(organisatsioonid.constructor).not.toEqual(Collection);
  });

  it('sets the entity class correctly', function() {
    expect(organisatsioonid.entityClass).toEqual(Organization);
    expect(organisatsioonid.list[0] instanceof Organization).toBe(true);
  });

  it('has a list of organizations', function() {
    organizations = new Organizations(null, null);
    expect(organizations.list).toEqual([]);
    expect(organisatsioonid.list.length).toEqual(3);
  });

  it('can find several organizations from an attribute', function() {
    organizations = organisatsioonid.where({ classification: 'party' });
    expect(organizations.list.length).toEqual(2);
    expect(organizations.list).toContain(organisatsioonid.list[0]);
    expect(organizations.list).toContain(organisatsioonid.list[1]);
    expect(organizations.list).not.toContain(organisatsioonid.list[2]);
  });

  it('can find a single organization from a unique attribute', function() {
    irl = organisatsioonid.findBy({ id: 'IRL' });
    expect(irl.name).toEqual('Isamaa ja Res Publica Liidu fraktsioon');
  });

  it('returns the first result from a non-unique attribute', function() {
    irl = organisatsioonid.findBy({ classification: 'party' });
    expect(irl.name).toEqual('Isamaa ja Res Publica Liidu fraktsioon');
  });

  it('can find a single organization from several attributes', function() {
    var attributes = { name: 'Isamaa ja Res Publica Liidu fraktsioon', classification: 'party' };
    irl = organisatsioonid.findBy(attributes);
    expect(irl.id).toEqual('IRL');
  });

  it('detects no items found', function() {
    var noOrg = organisatsioonid.findBy({ classification: 'business' });
    expect(noOrg).toBeNull();
  });
});
