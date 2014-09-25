
/**
 * Module dependencies.
 */

var isostring = require('isostring');
var hash = require('string-hash');
var time = require('unix-time');
var dot = require('obj-case');
var is = require('is');
var clone = require('clone');

/**
 * Map identify `msg`.
 *
 * @param {Identify} msg
 * @param {Object} settings
 * @return {Object}
 */

exports.identify = function(msg){
  var traits = formatTraits(msg.traits());
  var active = msg.active();
  var ret = {};

  ret.user_id = msg.userId();
  ret.custom_attributes = traits;

  if (msg.userAgent()) ret.last_seen_user_agent = msg.userAgent();
  if (msg.created()) ret.remote_created_at = time(msg.created());
  if (active) ret.last_request_at = time(msg.timestamp());
  if (msg.ip()) ret.last_seen_ip = msg.ip();
  if (msg.email()) ret.email = msg.email();
  if (msg.name()) ret.name = msg.name();

  // Add company data
  var companies = traits.companies;
  var company = msg.proxy('traits.company');

  if (company) companies = [company];
  if (is.array(companies)) ret.companies = companies.map(formatCompany);

  return ret;
};

/**
 * Map track `msg`.
 *
 * @param {Track} msg
 * @param {Object} settings
 * @return {Object}
 */

exports.track = function(msg){
  var ret = {};
  ret.created = time(msg.timestamp());
  ret.event_name = msg.event();
  ret.user_id = msg.userId();
  if (msg.email()) ret.email = msg.email();
  ret.metadata = msg.properties();
  return ret;
};

/**
 * Map group `msg`.
 *
 * @param {Group} msg
 * @return {Object}
 */

exports.group = function(msg){
  var ret = {};
  ret.remote_created_at = time(msg.created());
  ret.company_id = msg.groupId();
  ret.name = msg.name();
  ret.monthly_spend = msg.proxy('traits.monthlySpend');
  ret.plan = msg.proxy('traits.plan');
  ret.custom_attributes = formatTraits(msg.traits());
  return ret;
};

/**
 * Formats a company for use with intercom
 *
 * http://docs.intercom.io/#Companies
 *
 * TODO: add .companies()
 *
 * @param {Object} company
 * @return {Object}
 * @api private
 */

function formatCompany(company){
  if (is.string(company)) company = { name: company };

  var ret = {};
  ret.name = company.name;
  ret.custom_attributes = company;

  if (company.id) {
    ret.company_id = company.id;
  } else if (company.name) {
    ret.company_id = hash(company.name);
  }

  var created = dot(company, 'created') || dot(company, 'created_at');
  if (created) ret.remote_created_at = created;
  return ret;
}

/**
 * Format all the traits which are dates for intercoms format
 *
 * @param {Object} traits
 * @return {Object}
 * @api private
 */

function formatTraits(traits){
  traits = clone(traits);

  // if parent traits is obj or array
  if (is.object(traits) || is.array(traits)) {

    Object.keys(traits).forEach(function(key){
      var val = traits[key];
      // if child val is obj or array, recurse
      if (is.array(val) || is.object(val)) {
        traits[key] = (formatTraits(val));
      } else {
        // if array, key is index
        if (is.array(traits)) {
          var res = formatValue(null, val);
          traits[key] = (res[1]);
        // if obj, has key
        } else {
          var res = formatValue(key, val);
          traits[res[0]] = res[1];
          if (res[0] != key) delete traits[key];
        }
      }
    });
  // else traits is a value, so format
  } else {
      return formatValue(traits);
  }

  return traits;
}

function formatValue(key, val) {
  if (isostring(val) || is.date(val)) {
    val = time(val);
    key = dateKey(key);
  }
  return [key, val];
}

/**
 * Set up a key with the dates for intercom
 *
 * http://docs.intercom.io/#CustomDataDates
 *
 * @param {String} key
 * @return {String}
 * @api private
 */

function dateKey(key){
  if (endswith(key, '_at')) return key;
  if (endswith(key, ' at')) return key.substr(0, key.length - 3) + '_at';
  return key + '_at';
}

/**
 * Test whether a string ends with the suffix
 *
 * @param {String} str
 * @param {String} suffix
 * @return {String}
 * @api private
 */

function endswith(str, suffix){
  str = str.toLowerCase();
  return str.substr(str.length - suffix.length) === suffix;
}
