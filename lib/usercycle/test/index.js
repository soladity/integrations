
var Test = require('segmentio-integration-tester');
var helpers = require('../../../test/helpers');
var mapper = require('../mapper');
var time = require('unix-time');
var should = require('should');
var assert = require('assert');
var USERcycle = require('..');

describe('USERcycle', function () {
  var usercycle;
  var settings;
  var test;

  beforeEach(function(){
    settings = { key: 'd6831dd4a364dd3ae36aeec48346dc58eb2a5c6e' };
    usercycle = new USERcycle(settings);
    test = Test(usercycle, __dirname);
  });

  it('should have the correct settings', function(){
    test
      .name('USERcycle')
      .endpoint('https://api.usercycle.com/api/v1')
      .ensure('settings.key')
      .channels(['server', 'mobile', 'client'])
      .retries(2);
  });

  describe('mapper', function(){
    describe('identify', function(){
      it('should map basic identify', function(){
        test.maps('identify-basic');
      });
    });

    describe('track', function(){
      it('should map basic track', function(){
        test.maps('track-basic');
      });
    });
  });

  describe('.validate()', function(){
    it('should be invalid if .key is missing', function(){
      delete settings.key;
      test.invalid({}, settings);
    });

    it('should be valid if settings are complete', function(){
      test.valid({}, settings);
    });
  });

  describe('.track()', function(){
    it('should be able to track correctly', function(done){
      var json = test.fixture('track-basic');
      test
        .set(settings)
        .track(json.input)
        .query(json.output)
        .expects(201, done);
    });

    it('should error on invalid request', function(done){
      var date = new Date;
      var t = date / 1e3 | 0;
      test
        .set({ key: 'x' })
        .track({ event: 'event', timestamp: date })
        .error('cannot POST /api/v1/events.json?uid=&occurred_at=' + t + '&action_name=event&email= (401)', done);
    });
  });

  describe('.identify()', function(){
    it('should be able to identify correctly', function(done){
      var json = test.fixture('identify-basic');
      test
        .set(settings)
        .identify(json.input)
        .query(json.output)
        .expects(201, done);
    });

    it('should error on invalid request', function(done){
      var date = new Date;
      var t = date / 1e3 | 0;
      test
        .set({ key: 'x' })
        .identify({ event: 'event', timestamp: date })
        .error('cannot POST /api/v1/events.json?uid=&occurred_at=' + t + '&action_name=came_back& (401)', done);
    });
  });
});
