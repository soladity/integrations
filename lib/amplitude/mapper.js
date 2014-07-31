
/**
 * Module dependencies.
 */

var parse = require('locale-string').parse;
var title = require('to-title-case');
var find = require('obj-case');
var del = find.del;

/**
 * Map `track`.
 *
 * @param {Track} track
 * @return {Object}
 * @api private
 */

exports.track = function(track){
  var payload = common(track);
  payload.revenue = track.revenue();
  payload.event_type = track.event();
  payload.event_properties = properties(track.properties());
  return payload;
};

/**
 * Map `page`.
 *
 * @param {Page} page
 * @return {Object}
 * @api private
 */


exports.page = function(page){
  var payload = common(page);
  payload.event_type = page.event(page.fullName());
  payload.event_properties = properties(page.properties());
  return payload;
};

/**
 * Map `screen`.
 *
 * @param {Screen} screen
 * @return {Object}
 * @api private
 */

exports.screen = function(screen){
  var payload = common(screen);
  payload.event_type = screen.event(screen.fullName());
  payload.event_properties = properties(screen.properties());
  return payload;
};

/**
 * Format the amplitude specific properties.
 *
 * @param {Track} facade
 * @return {Object}
 */

function common(facade){
  var options = facade.options('Amplitude');
  var ret = {
    user_id: facade.userId(),
    device_id: facade.proxy('context.device.id') || facade.anonymousId(),
    time: facade.timestamp().getTime(),
    user_properties: facade.traits(),
    client_sdk: facade.proxy('context.library.name'),
    app_version: facade.proxy('context.app.version'),
    client_os: facade.proxy('context.os.version'),
    device_carrier: facade.proxy('context.network.carrier'),
    device_model: facade.proxy('context.device.model'),
    device_brand: facade.proxy('context.device.brand'),
    device_manufacturer: facade.proxy('context.device.manufacturer'),
    location_lat: facade.proxy('context.location.latitude'),
    location_lng: facade.proxy('context.location.longitude'),
    ip: facade.ip(),
    amplitude_event_type: find(options, 'event_type'),
    session_id: find(options, 'session_id'),
    event_id: find(options, 'event_id')
  };

  var loc = locale(facade);
  if (loc) {
    ret.language = loc.language;
    ret.country = loc.country;
  }
  return ret;
}

/**
 * Gets the locale object info from the facade
 *
 * @param {Facade} facade
 * @return {Object}
 *   - {String} country
 *   - {String} language
 */

function locale(facade){
  var locale = facade.proxy('context.locale');
  if (!locale) return;
  return parse(locale);
}


/**
 * Remove amplitude specific properties from facade properties.
 *
 * @param {Object} properties
 * @return {Object}
 */

function properties(properties){
  del(properties, 'language');
  del(properties, 'revenue');
  del(properties, 'event_id');
  del(properties, 'amplitude_event_type');
  return properties;
}