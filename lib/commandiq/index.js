
/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');
var mapper = require('./mapper');

/**
 * Expose `CommandIQ`
 */

var CommandIQ = module.exports = integration('CommandIQ')
  .endpoint('http://api.commandiq.com')
  .channels(['server', 'mobile', 'client'])
  .ensure('settings.apiKey')
  .mapper(mapper)
  .retries(2);

/**
 * Handles segment.io's identify method.
 *
 * https://commandiq.com/docs/api
 *
 * @param {Object} payload
 * @param {Function} fn
 * @api public
 */

CommandIQ.prototype.identify = function(payload, fn){

  this
    .post('/user/identify/segmentio')
    .auth(this.settings.apiKey, '')
    .set('Accept', 'application/vnd.commandiq+json; version=1;')
    .type('json')
    .send(payload)
    .end(this.handle(fn));

};

/**
 * Handles segment.io's track method.
 *
 * @param {Object} payload
 * @param {Function} fn
 * @api public
 */

CommandIQ.prototype.track = function(payload, fn){

  this
    .post('/user/track/segmentio')
    .auth(this.settings.apiKey, '')
    .set('Accept', 'application/vnd.commandiq+json; version=1;')
    .type('json')
    .send(payload)
    .end(this.handle(fn));

};