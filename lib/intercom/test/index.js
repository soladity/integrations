
var Test = require('segmentio-integration-tester');
var helpers = require('../../../test/helpers');
var facade = require('segmentio-facade');
var hash = require('string-hash');
var mapper = require('../mapper');
var time = require('unix-time');
var should = require('should');
var assert = require('assert');
var Intercom = require('..');
var redis = require('redis');

describe('Intercom', function(){
  var intercom;
  var settings;
  var payload;
  var test;
  var db;

  before(function(done){
    db = redis.createClient();
    db.on('ready', done);
    db.on('error', done);
  });

  beforeEach(function(){
    payload = {};
    settings = {
      appId: 'a3vy8ufv',
      apiKey: '4ed539b9c0193de8e75bcb00a357cac54db90902'
    };
    intercom = new Intercom(settings);
    test = Test(intercom, __dirname);
    test.mapper(mapper);
    intercom.redis(db);
  });

  it('should have correct settings', function(){
    test
      .name('Intercom')
      .endpoint('https://api-segment.intercom.io')
      .ensure('settings.apiKey')
      .ensure('settings.appId')
      .ensure('message.userId')
      .channels(['server'])
      .retries(2);
  });

  describe('.validate()', function(){
    var msg;

    beforeEach(function(){
      msg = { userId: 'user-id' };
    });

    it('should be invalid if .appId is missing', function(){
      delete settings.appId;
      test.invalid(msg, settings);
    });

    it('should be invalid if .apiKey is missing', function(){
      delete settings.apiKey;
      test.invalid(msg, settings);
    });

    it('should be invalid if .userId is missing', function(){
      delete msg.userId;
      test.invalid(msg, settings);
    });

    it('should be valid when .apiKey and .appId are given', function(){
      test.valid(msg, settings);
    });
  });

  describe('mapper', function(){
    describe('identify', function(){
      it('should map basic identify', function(){
        test.maps('identify-basic');
      });

      it('should map basic context', function(){
        test.maps('identify-context');
      });

      it('should respect .active()', function(){
        test.maps('identify-active');
      });
    });

    describe('group', function(){
      it('should map basic group', function(){
        test.maps('group-basic');
      });
    });

    describe('track', function(){
      it('should map basic track', function(){
        test.maps('track-basic');
      });
    });
  });

  describe('.identify()', function(){
    it('should be able to identify correctly', function(done){
      var msg = helpers.identify();

      payload.user_id = msg.userId();
      payload.remote_created_at = time(msg.created());
      payload.last_request_at = time(msg.timestamp());
      payload.last_seen_ip = msg.ip();
      payload.email = msg.email();
      payload.name = msg.name();
      payload.custom_attributes = intercom.formatTraits(msg.traits());
      payload.companies = [{
        company_id: hash('Segment.io'),
        custom_attributes: { name: 'Segment.io' },
        name: 'Segment.io'
      }];

      test
        .set(settings)
        .identify(msg)
        .sends(payload)
        .expects(200)
        .end(done);
    });

    it('should not error on invalid companies', function(done){
      var identify = helpers.identify({ traits: { companies: 'foo' }});
      intercom.identify(identify, function(err){
        should.not.exist(err);
        done();
      });
    });

    it('should send the ip address', function(done){
      var timestamp = new Date();
      test
        .set(settings)
        .identify({
          context: { ip: '70.211.71.236' },
          timestamp: timestamp,
          userId: 'userId'
        })
        .sends({
          custom_attributes: { id: 'userId' },
          last_request_at: time(timestamp),
          last_seen_ip: '70.211.71.236',
          user_id: 'userId',
        })
        .expects(200, done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ apiKey: 'x' })
        .identify({})
        .error('cannot POST /users (401)', done);
    });
  });

  describe('.group()', function(){
    it.skip('should be able to group correctly', function(done){
      var group = test.fixture('group-basic');
      group.output.custom_attributes.createdAt = new Date(group.output.custom_attributes.createdAt);

      test.group(group.input);
      test.requests(2);

      //requests.forEach(function(query, i){
        test
          .set(settings)
          .request(0)
          .sends(group.output)
          .expects(200);

      var secondGroup = test.fixture('group-basic');
      var userRequest = new Object(secondGroup.output);
      userRequest.user_id = secondGroup.input.userId;
      secondGroup.output.custom_attributes.company_id = secondGroup.input.groupId;
      userRequest.companies = [new Object(secondGroup.output.custom_attributes)];

        test
          .request(1)
          .sends(userRequest)
          .expects(200);

          test.end(done);
      //});

          /*test.end(
            test.sends(identify.output)
          );*/
    })

    it('should work with .createdAt', function(done){
      var traits = { createdAt: 'Jan 1, 2000 3:32:33 PM', name: 'old company' };
      var group = helpers.group({ traits: traits, groupId: 'a5322d6' });
      delete group.obj.traits.created;
      intercom.group(group, done);
    })

    it('should work with .created', function(done){
      var traits = { created: 'Jan 1, 2014 3:32:33 PM', name: 'new company' };
      var group = helpers.group({ traits: traits, groupId: 'e186e5de' });
      intercom.group(group, done);
    })
  })

  describe('.track()', function(){
    it('should track', function(done){
      var msg = helpers.track();

      payload.created = time(msg.timestamp());
      payload.event_name = msg.event();
      payload.user_id = msg.userId();
      payload.email = msg.email();
      payload.metadata = msg.properties();

      test
        .set(settings)
        .track(msg)
        .sends(payload)
        .expects(202)
        .end(done);
    });

    it('should error on invalid creds', function(done){
      test
        .set({ apiKey: 'x' })
        .track({})
        .error('cannot POST /events (401)', done);
    });
  });
});
