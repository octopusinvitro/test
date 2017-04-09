'use strict';

describe('Post', function() {
  var
    Popolo = require('../index'),
    Entity = require('../src/entity'),
    Organization = require('../src/organization'),
    Post = require('../src/post'),
    post = new Post(null, null),

    kenya = Popolo.read('spec/fixtures/kenya.json'),
    kpost = kenya.posts.list[0];

  it('is an entity', function() {
    expect(kpost instanceof Entity).toBe(true);
    expect(kpost instanceof Post).toBe(true);
  });

  it('has the right constructor', function() {
    expect(kpost.constructor).toEqual(Post);
    expect(kpost.constructor).not.toEqual(Entity);
  });

  it('has an id', function() {
    expect(post.id).toBeUndefined();
    expect(kpost.id).toEqual('nominated_representative');
  });

  it('has a label', function() {
    expect(post.label).toBeUndefined();
    expect(kpost.label).toEqual('Nominated Representative');
  });

  it('has an organization id', function() {
    expect(post.organization_id).toBeUndefined();
    expect(kpost.organization_id).toEqual('574eff8e-8171-4f2b-8279-60ed8dec1a2a');
  });

  it('has an organization', function() {
    expect(post.organization).toBeUndefined();
    expect(kpost.organization instanceof Organization).toBe(true);
    expect(kpost.organization.name).toEqual('National Assembly');
  });

  it('has a wikidate identifier', function() {
    expect(kpost.wikidata).toBeUndefined();
  });
});
