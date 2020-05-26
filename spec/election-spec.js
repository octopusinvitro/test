'use strict';

describe('Election', function() {
  var
    Popolo = require('../index'),
    PopoloEvent = require('../src/event'),
    Election = require('../src/election'),

    estonia = Popolo.read('spec/fixtures/estonia.json'),
    riigikogu = new Election(estonia.events[1], estonia);

  it('is an event', function() {
    expect(riigikogu instanceof PopoloEvent).toBe(true);
    expect(riigikogu instanceof Election).toBe(true);
  });

  it('has the right constructor', function() {
    expect(riigikogu.constructor).toEqual(Election);
    expect(riigikogu.constructor).not.toEqual(PopoloEvent);
  });

  it('has an id', function() {
    expect(riigikogu.id).toEqual('Q16412592');
  });
});
