
var Test = require('segmentio-integration-tester');
var helpers = require('../../../test/helpers');
var facade = require('segmentio-facade');
var assert = require('assert');
var should = require('should');
var mapper = require('../mapper');
var CommandIQ = require('..');

describe('CommandIQ', function(){
  var settings;
  var test;
  var ciq;

  beforeEach(function(){
    settings = { apiKey: 'hokaisjzaacdxlpaixf4f4yaev' };
    ciq = new CommandIQ(settings);
    test = Test(ciq, __dirname);
  });

  it('should have correct settings', function(){
    test
      .name('CommandIQ')
      .endpoint('http://api.commandiq.com')
      .channels(['server', 'mobile', 'client'])
      .ensure('settings.apiKey')
      .retries(2);
  });

  describe('.validate()', function(){
    it('should require an apiKey', function(){
      test.invalid({}, {});
      test.invalid({}, { apiKey: null });
    });

    it('should validate with the required settings', function(){
      test.valid({}, { apiKey : 'xxx' });
    });
  });


  describe('mapper', function(){

    describe('identify-anon', function(){
      it('should map basic identify', function(){
        test.maps('identify-basic');
      });
    });

    describe('identify-basic', function(){
      it('should map basic identify', function(){
        test.maps('identify-basic');
      });
    });

    describe('identify-token-android', function(){
      it('should map identify-token-android', function(){
        test.maps('identify-token-android');
      });
    });

    describe('identify-token-ios', function(){
      it('should map identify-token-ios', function(){
        test.maps('identify-token-ios');
      });
    });

    describe('track-anon', function(){
      it('should map track-anon', function(){
        test.maps('track-anon');
      });
    });

    describe('track-basic', function(){
      it('should map basic track', function(){
        test.maps('track-basic');
      });
    });
  });

  describe('.track()', function(){
    it('should get a good response from the API', function(done){
      var json = test.fixture('track-basic');
      json.output.attributes.date = new Date(json.output.attributes.date);
      test
        .set(settings)
        .track(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should fallback to anonymousId', function(done){
      var json = test.fixture('track-anon');
      json.output.attributes.date = new Date(json.output.attributes.date);
      test
        .set(settings)
        .track(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });
  });

  describe('.identify()', function(){
    it('should get a good response from the API', function(done){
      var json = test.fixture('identify-basic');
      test
        .set(settings)
        .request(1)
        .identify(json.input)
        .sends(json.output)
        .end(done);
    });

    it('should fallback to anonymousId', function(done){
      var json = test.fixture('identify-anon');
      test
        .set(settings)
        .request(1)
        .identify(json.input)
        .sends(json.output)
        .end(done);
    });

    it('should map device token for iOS successfully', function(done){
      var json = test.fixture('identify-token-ios');
      test
        .set(settings)
        .request(1)
        .identify(json.input)
        .sends(json.output)
        .end(done);
    });

    it('should map device token for Android successfully', function(done){
      var json = test.fixture('identify-token-android');
      test
        .set(settings)
        .request(1)
        .identify(json.input)
        .sends(json.output)
        .end(done);
    });
  });
});
