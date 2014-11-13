
/**
 * Module dependencies.
 */

var extend = require('extend');

/**
 * Map identify.
 *
 * @parma {Facade} track
 * @return {Object}
 */

exports.identify = function(identify){
  var payload = {};
  payload.user_id = identify.userId() || identify.sessionId();

  var attributes = {};
  var traits = identify.traits();

  var email = identify.email();
  if (email) {
    attributes.ciq_user_email = email;
    delete traits.email;
  }

  var device = identify.device();
  if (device.token && device.type) {
    if (device.type === 'android') attributes.ciq_user_android_push_registration_id = device.token;
    if (device.type === 'ios') attributes.ciq_user_ios_push_device_token = device.token;
  }

  var timezone = identify.timezone();
  if (timezone) attributes.ciq_user_timezone = timezone;

  extend(attributes, traits);
  payload.attributes = attributes;

  return payload;
};

/**
 * Map track.
 *
 * @parma {Facade} track
 * @return {Object}
 */

exports.track = function(track){
  var payload = {};
  payload.user_id = track.userId() || track.sessionId();
  payload.event_key = track.event();
  payload.attributes = track.properties();

  return payload;
};
