'use strict';

describe('Popolo', function() {
  var Popolo = require('../index');

  it('reads a Popolo json file', function() {
    var popolo = Popolo.read('spec/fixtures/dummy.json');
    expect(popolo.persons.length).toEqual(1);
    expect(popolo.persons[0].id).toEqual('123');
    expect(popolo.persons[0].name).toEqual('Jon Doe');
  });

  it('returns no data if there is a parsing error', function() {
    var popolo = Popolo.read('spec/fixtures/bad.json');
    expect(popolo).toEqual({});
  });

  it('returns no data if file does not exits', function() {
    var popolo = Popolo.read('foo');
    expect(popolo).toEqual({});
  });
});
