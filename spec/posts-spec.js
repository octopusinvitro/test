'use strict';

describe('Posts', function() {
  var
    Popolo = require('../index'),
    Collection = require('../src/collection'),
    Posts = require('../src/posts'),
    Post = require('../src/post'),
    posts, post,

    kenya = Popolo.read('spec/fixtures/kenya.json'),
    nafasiza = new Posts(estonia.posts, estonia);

  it('is a collection', function() {
    expect(nafasiza instanceof Collection).toBe(true);
    expect(nafasiza instanceof Posts).toBe(true);
  });

  it('has the right constructor', function() {
    expect(nafasiza.constructor).toEqual(Posts);
    expect(nafasiza.constructor).not.toEqual(Collection);
  });

  it('sets the entity class correctly', function() {
    expect(nafasiza.entityClass).toEqual(Post);
    expect(nafasiza.list[0] instanceof Post).toBe(true);
  });

  it('has a list of posts', function() {
    posts = new Posts(null, null);
    expect(posts.list).toEqual([]);
    expect(nafasiza.list.length).toEqual(2);
  });

  it('can find several posts from an attribute', function() {
    posts = nafasiza.where({label: 'Nominated Representative'});
    expect(posts.list.length).toEqual(1);
    expect(posts.list).toContain(nafasiza.list[0]);
    expect(posts.list).not.toContain(nafasiza.list[1]);
  });

  it('can find a single post from a unique attribute', function() {
    post = nafasiza.findBy({ id: 'nominated_representative' });
    expect(post.label).toEqual('Nominated Representative');
  });

  it('returns the first result from a non-unique attribute', function() {
    post = nafasiza.findBy({ organization_id: '574eff8e-8171-4f2b-8279-60ed8dec1a2a' });
    expect(post.label).toEqual('Nominated Representative');
  });

  it('can find a single post from several attributes', function() {
    var attributes = {
      label: 'Nominated Representative',
      organization_id: '574eff8e-8171-4f2b-8279-60ed8dec1a2a'
    };
    post = nafasiza.findBy(attributes);
    expect(post.id).toEqual('nominated_representative');
  });

  it('detects no items found', function() {
    var noPost = nafasiza.findBy({ label: 'Spartan Soldier' });
    expect(noPost).toBeNull();
  });
});
