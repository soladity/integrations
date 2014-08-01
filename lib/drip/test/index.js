
var Drip = require('..').Drip;
var settings = require('./auth').Drip;
var helpers = require('./helpers');
var Track = require('segmentio-facade').Track;
var Identify = require('segmentio-facade').Identify;
var assert = require('assert');
var drip = new Drip;

describe('Drip', function(){
  describe('.enabled()', function(){
    it('should be enabled for server side messages only', function(){
      var msg = helpers.track({ channel: 'server', properties: { email: 'a@a.com' } });
      assert(true == drip.enabled(msg, settings));
    })

    it('should not be enabled on other channels', function(){
      var msg = new Track({ channel: 'client', properties: { email: 'a@a.com' } });
      assert(false == drip.enabled(msg, settings));
    })

    it('should not be enabled for messages without email', function(){
      var msg = new Track({ channel: 'server' });
      assert(false == drip.enabled(msg));
    })
  })

  describe('.validate()', function(){
    it('should validate when token + accountId are given', function(){
      var msg = new Track({});
      assert(null == drip.validate(msg, settings));
    })

    it('should error when token / accountId are missing', function(){
      var msg = new Track({});
      assert(drip.validate(msg, { accountId: 132 }));
      assert(drip.validate(msg, { token: 123 }));
    })

    it('should error when the msg is identify and campaignId is missing', function(){
      var msg = new Identify({});
      assert(drip.validate(msg, {}));
    })
  })

  describe('.identify()', function(){
    it('should identify user successfully', function(done){
      var msg = helpers.identify({ traits: { email: 'amir@segment.io' } });;
      drip.identify(msg, settings, done);
    })

    it('should identify again', function(done){
      var msg = helpers.identify({ traits: { email: 'amir@segment.io' } });;
      drip.identify(msg, settings, done);
    })

    it('should error with BadRequest on wrong creds', function(done){
      var msg = helpers.identify({});
      drip.identify(msg, { accountId: 1, token: 'x' }, function(err){
        assert(err);
        done();
      })
    })
  })

  describe('.campaignId()', function(){
    it('should return campaignId from the message', function(){
      var msg = helpers.track({ options: { Drip: { campaignId: '123' } }});
      assert('123' == drip.campaignId(msg, {}));
    })
  })

  describe('.track()', function(){
    it('should track successfully', function(done){
      var msg = helpers.track({ properties: { email: 'amir@segment.io' }, options: { Drip: { campaignId: '2735752' } }});
      drip.track(msg, settings, done);
    })
  })
})
