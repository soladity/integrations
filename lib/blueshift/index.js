
/**
 * Module dependencies.
 */

var integration = require('segmentio-integration');

/**
 * Expose `Blueshift`
 *
 * Documentation: http://getblueshift.com/api-documentation
 */

var Blueshift = module.exports = integration('Blueshift')
  .endpoint('https://api.getblueshift.com/api/v1/event/segmentio')
  .channels(['server', 'mobile'])
  .ensure('settings.apiKey')
  .retries(3);

/**
 * Methods
 */

Blueshift.prototype.identify = request;
Blueshift.prototype.track = request;
Blueshift.prototype.alias = request;
Blueshift.prototype.group = request;
Blueshift.prototype.screen = request;
Blueshift.prototype.page = request;

/**
 * Impl for all methods.
 *
 * @param {Facade} facade
 * @param {Function} fn
 * @api public
 */

function request(facade, fn){
  return this
    .post()
    .type('json')
    .query({ apiKey: this.settings.apiKey })
    .send(facade.json())
    .end(this.handle(fn));
};
