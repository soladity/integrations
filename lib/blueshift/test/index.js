
var Test = require('segmentio-integration-tester');
var helpers = require('../../../test/helpers');
var facade = require('segmentio-facade');
var should = require('should');
var assert = require('assert');
var Blueshift = require('..');
var Track = facade.Track;

describe('Blueshift', function(){
  var blueshift;
  var settings;
  var test;

  beforeEach(function(){
    settings = { apiKey: '684ee9117204fb2125b878e5608a28f9' };
    blueshift = new Blueshift(settings);
    test = Test(blueshift, __dirname);
  });

  it('should have correct settings', function(){
    test
      .name('Blueshift')
      .endpoint('https://api.getblueshift.com/api/v1/event/segmentio')
      .channels(['server', 'mobile'])
      .ensure('settings.apiKey')
      .retries(3);
  });

  describe('.validate()', function(){
    it('should be invalid when .apiKey is missing', function(){
      delete settings.apiKey;
      test.invalid({}, settings);
    });

    it('should be valid when settings are complete', function(){
      test.valid({}, settings);
    });
  });

  describe('.track()', function(){
    it('success', function(done){
      var json = test.fixture('track-basic');
      test
        .set(settings)
        .track(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid api key', function(done){
      var json = test.fixture('track-basic');
      test
        .set({ apiKey: '1234' })
        .track(json.input)
        .error(done);
    });
  });

  describe('.identify()', function(){
    it('success', function(done){
      var json = test.fixture('identify-basic');
      test
        .set(settings)
        .identify(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid api key', function(done){
      var json = test.fixture('identify-basic');
      test
        .set({ apiKey: '1234' })
        .identify(json.input)
        .error(done);
    });
  });

  describe('.alias()', function(){
    it('success', function(done){
      var json = test.fixture('alias-basic');
      test
        .set(settings)
        .alias(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid api key', function(done){
      var json = test.fixture('alias-basic');
      test
        .set({ apiKey: '1234' })
        .alias(json.input)
        .error(done);
    });
  });

  describe('.group()', function(){
    it('success', function(done){
      var json = test.fixture('group-basic');
      test
        .set(settings)
        .group(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid api key', function(done){
      var json = test.fixture('group-basic');
      test
        .set({ apiKey: '1234' })
        .group(json.input)
        .error(done);
    });
  });

  describe('.page()', function(){
    it('success', function(done){
      var json = test.fixture('page-basic');
      test
        .set(settings)
        .page(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid api key', function(done){
      var json = test.fixture('page-basic');
      test
        .set({ apiKey: '1234' })
        .page(json.input)
        .error(done);
    });
  });

  describe('.screen()', function(){
    it('success', function(done){
      var json = test.fixture('screen-basic');
      test
        .set(settings)
        .screen(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should error with invalid api key', function(done){
      var json = test.fixture('screen-basic');
      test
        .set({ apiKey: '1234' })
        .screen(json.input)
        .error(done);
    });
  });
});
