'use strict';

describe('Popolo', function() {
  var Popolo = require('../index');

  it('reads a Popolo json file', function() {
    var popolo = Popolo.read('spec/fixtures/dummy-person.json');
    expect(popolo.persons.length).toEqual(1);
    expect(popolo.persons[0].id).toEqual('123');
    expect(popolo.persons[0].name).toEqual('Jon Doe');
  });
});
