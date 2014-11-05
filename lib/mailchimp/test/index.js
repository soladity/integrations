
var Test = require('segmentio-integration-tester');
var helpers = require('../../../test/helpers');
var facade = require('segmentio-facade');
var object = require('obj-case');
var should = require('should');
var assert = require('assert');
var Mailchimp = require('..');
var Identify = facade.Identify;

describe('MailChimp', function(){
  var mailchimp;
  var settings;
  var payload;
  var test;

  beforeEach(function(){
    payload = {};
    settings = {
      datacenter: 'us2',
      listId: '4b38f6546c',
      apiKey: '859e55635946cd5498f3e909b806e6ba-us2'
    };
    mailchimp = new Mailchimp(settings);
    test = Test(mailchimp, __dirname);
  });

  it('should have correct settings', function(){
    test
      .name('MailChimp')
      .channels(['server', 'mobile', 'client'])
      .ensure('settings.datacenter')
      .ensure('settings.apiKey')
      .ensure('settings.listId')
      .ensure('message.email')
      .retries(2);
  });

  describe('.validate()', function(){
    var msg;

    beforeEach(function(){
      msg = {
        type: 'identify',
        traits: {
          email: 'jd@example.com'
        }
      };
    });

    it('should be invalid if .apiKey is missing', function(){
      delete settings.apiKey;
      test.invalid(msg, settings);
    });

    it('should be invalid if .listId is missing', function(){
      delete settings.listId;
      test.invalid(msg, settings);
    });

    it('should be invalid if .datacenter is missing', function(){
      delete settings.datacenter;
      test.invalid(msg, settings);
    });

    it('should be invalid if .email is missing', function(){
      delete msg.traits.email;
      test.invalid(msg, settings);
    });

    it('should be valid when settings are complete', function(){
      test.valid(msg, settings);
    });
  });

  describe('mapper', function(){
    describe('identify', function(){
      it('should map basic identify', function(){
        test.maps('identify-basic', settings);
      });
      it('should map identify with doubleOptIn', function(){
        test.maps('identify-double-optin');
      });
    });
  });

  describe('.identify()', function(){
    it('should identify without doubleOptIn', function(done){
      var json = test.fixture('identify-basic');

      test
        .set(settings)
        .identify(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('should identify with doubleOptIn', function(done){
      var json = test.fixture('identify-double-optin');

      test
        .set(json.settings)
        .identify(json.input)
        .sends(json.output)
        .expects(200)
        .end(done);
    });

    it('will error on an invalid set of keys', function(done){
      test
        .set({ apiKey: 'x' })
        .set({ listId: 'x' })
        .identify(helpers.identify())
        .error('cannot POST /2.0/lists/subscribe.json (500)', done);
    });
  });
});
