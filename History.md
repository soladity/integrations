
1.2.16 / 2014-10-25
===================

  * Adding product count to ecommerce events

1.2.15 / 2014-10-21
===================

  * changing to doubleOptIn
  * proxy context.screen to resolution

1.2.14 / 2014-10-16
===================

  * mixpanel: reject null fields, update
  * Pick up context data for Mixpanel

1.2.13 / 2014-10-14
===================

 * Attribution: Added Screen Calls
 * Attribution: Extended Support for page options
 * Attribution: Track Page Views

1.2.12 / 2014-10-09
==================

 * mixpanel: update tests
 * upgrade facade for page / screen fixes
 * google-analytics: fix tests
 * gainsight: fix tests
 * amplitude: fix tests

1.2.11 / 2014-10-08
===================

  * GA: added non-interaction param to track calls

1.2.10 / 2014-10-02
===================

  * loosening segmentio-integration dep
  * hubspot: fix tests
  * travis: npm ^ doesn't work on 0.8
  * travis: node 0.10 -> node 0.8
  * Woopra: fix to pass id param correctly
  * Send session id to attribution

1.2.9 / 2014-09-27
==================

  * heap: Change terminology: apiKey to appId
  * intercom: adding additional fixtures
  * docs: Fix for contributing page khaos info
  * Intercom: fixed dates to be converted to unix timestamp in payload
  * attribution: Added attribution integration
  * add test-style

1.2.8 / 2014-09-16
==================

 * heap - add support for identify
 * make test: fix --grep
 * Merge pull request #206 from segmentio/contrib
 * readme updates
 * docs

1.2.7 / 2014-09-10
==================

 * deps: upgrade proto to 2.1
 * intercom: use appId
 * intercom: lock .identify()

1.2.6 / 2014-09-10
==================

  * outbound: fixed duplicate traits; added fixtures
  * tests: depend on lint on test target and remove unused vars

1.2.5 / 2014-09-09
==================

  * Bump obj-case dependency

1.2.4 / 2014-09-04
==================

 * ga: use .call()
 * fix ga classic

1.2.3 / 2014-09-02
==================

 * usercycle: enabling all channels

1.2.2 / 2014-09-02
==================

 * librato: fallback to (context || options).source
 * errors: add error() tests to all integrations

1.2.1 / 2014-08-29
==================

 * amplitude: fix track not picking up country

1.2.0 / 2014-08-27
==================

 * deps: upgrade proto and tester
 * .gitignore: ignore coverage/
 * tests: fix typos
 * amplitude: enable on mobile channel
 * .ensure(): change validation signature
 * helpscout: update api key
 * woopra: move to new proto
 * webhooks: move to new proto
 * vero: move to new proto
 * usercycle: move to new proto
 * trakio: move to new proto
 * stacklead: move to new proto
 * preact: move to new proto
 * outbound: move to new proto
 * mixpanel: move to new proto
 * mailchimp: move to new proto
 * lytics: move to new proto
 * librato: remove userAgent
 * librato: move to new proto
 * klaviyo: move to new proto
 * kissmetrics: move to new proto
 * keenio: move to new proto
 * iterable: move to new proto
 * ironio: move to new proto
 * intercom: move to new proto
 * hubspot: move to new proto
 * helpscout: move to new proto
 * heap: move to new proto
 * ga: move to new proto and remove ._pageview()
 * Gainsight: move to new proto
 * frontleaf: move to new proto
 * drip: move to new proto
 * customerio: move to new proto
 * commandiq: move to new proto
 * churnbee: move to new proto
 * calq: move to new proto
 * amplitude: move to new proto
 * deps: depend on integration refactor

1.1.51 / 2014-08-27
===================

  * Merge pull request #198 from segmentio/fix/uncaught-webhook
  * adding try/catch

1.1.50 / 2014-08-22
==================

 * ga: fix typo

1.1.49 / 2014-08-22
==================

 * ga: add campaign info
 * ga: send context.app
 * ga: add custom dimensions and metrics, closes #126
 * ga: get mapper working

1.1.48 / 2014-08-21
==================

 * amplitude: adding country support
 * USERcycle: fix `identify` event name to match the frontend
 * ga: fixing revenue fallback for event value

1.1.47 / 2014-08-12
==================

 * keen.io: fixing addons without input
 * mixpanel tests: use fixtures in api calls
 * calq tests: use fixtures in api calls
 * deps: add segmentio/node-reject
 * calq: use reject()
 * amplitude tests: use fixtures in api calls

1.1.46 / 2014-08-12
==================

 * outbound: migrating to v2
 * usercycle: fix for proper settings

1.1.45 / 2014-08-07
==================

 * loosening facade dep

1.1.44 / 2014-08-07
==================

 * google analytics: include userId
 * churnbee: dont check for .events
 * frontleaf: add fixtures, and fix bug that ignores arrays
 * drip: add mapper and fixtures
 * customerio: add mapper
 * churnbee: add fixtures, and fixes

1.1.43 / 2014-08-06
===================

  * Dont pass undefined to string-hash
  * Create a mapper for MailChimp integration
  * CommandIQ: ocd
  * preact: send extras
  * amplitude: fix tests for locale change
  * mixpanel: add .track() tests
  * calq: new fixtures
  * amplitude: add fixtures
  * deps: update Integration to 1.3.x
  * gainsight: skip .track()
  * gainsight: skip tests until we have a new key
  * mixpanel: add some tests
  * iterable: add fixtures
  * mailchimp: add tests
  * Klav: update tests
  * KISSmetrics: update tests
  * keen: update tests
  * re-pin integration
  * amplitude: update tests
  * klaviyo: add tests
  * kissmetrics: add tests
  * keen: add more tests
  * keen: add tests
  * helpers: add mapper test plugin
  * intercom tests: fix .track()
  * librato: add tests
  * librato: export clean
  * lytics: add tests
  * outbound: add tests
  * preact: add tests
  * stacklead: add tests
  * trak.io: add tests
  * Iterable: add tests
  * usercycle: add tests
  * iron-io: add tests
  * Intercom: add tests
  * hubspot: add tests
  * helpscout: add tests
  * heap: add tests
  * ga: add tests
  * frontleaf: add tests
  * drip: add tests
  * customerio: add tests
  * churnbee: add tests
  * Update vero tests
  * Update amplitude
  * amplitude example
  * tests: move all tests to lib/*/test, and inline settings
  * tests: add test to ensure all integrations are exported
  * expose integrations all integrations using readdir
  * move all tests to lib/*/test
  * Updated delimiter

1.1.42 / 2014-07-30
==================

 * amplitude: adding locale parsing
 * usercycle: dont cast objects to strings

1.1.41 / 2014-07-23
==================

 * iron-io: add methods

1.1.40 / 2014-07-16
==================

 * intercom: updating endpoint

1.1.39 / 2014-07-14
==================

 * amplitude: updating to use separate fields + sessionId

1.1.38 / 2014-07-11
==================

 * amplitude: updating sdk
 * amplitude: adding anonymousId mapping for deviceId
 * churnbee: fixing double callback
 * churnbee: add array settings support
 * intercom: migrating to v2 API
 * ga: send page name, closes #140
 * woopra: updating timestamp, fixes #145

1.1.37 / 2014-07-03
==================

 * amplitude: updating context to include device_type

1.1.36 / 2014-06-27
==================

 * amplitude: adding check for event_id

1.1.35 / 2014-06-26
==================

 * amplitude: adding event properties
 * intercom: fix last seen ip, fixes #135

1.1.34 / 2014-06-24
==================

 * amplitude: adding page and screen calls
 * calq: adding integration

1.1.33 / 2014-06-23
==================

 * ga: add ecommerce, closes #125
 * drip: fix undefined BadRequest
 * make-test: lint before testing

1.1.32 / 2014-06-23
==================

 * Add support for Heap.

1.1.31 / 2014-06-20
==================

 * gainsight: updating for all channels

1.1.30 / 2014-06-10
==================

 * vero: updating tests + cleanup
 * stacklead: small mapping refactor
 * gainsight: merging gainsight
 * mixpanel: cleanup + adding `legacySuperProperties` setting

1.1.29 / 2014-05-27
==================

 * Fix mixpanel integration from sending created_at

1.1.28 / 2014-05-19
==================

 * change kissmetrics setting, fix librato tests
 * fix keen.io options.traits

1.1.27 / 2014-05-19
==================

 * Librato integration respects zero values coming in
 * fix hubspot errors. reference
 * add linting
 * adding prefixing for event names, behind flag

1.1.26 / 2014-05-16
==================

 * keen: adding addons, fixes #85 and fixing error responses.

1.1.25 / 2014-05-16
==================

 * kissmetrics: only stringify objects
 * intercom: allow createdAt / created_at
 * tests: chnage mixpanel increment event, to be "increment"

1.1.24 / 2014-05-09
==================

 * frontleaf: adding frontleaft integration

1.1.23 / 2014-05-08
==================

 * kissmetrics: fix merge error

1.1.22 / 2014-05-08
==================

 * kissmetrics: add auto-alias

1.1.21 / 2014-05-06
==================

 * webhooks: adding transform for new spec
 * customerio: when the id is an email send it as .email too

1.1.20 / 2014-04-24
==================

 * hubspot: adding fix for "date" types + test cleanup
 * preact: added support for server-side Identify call, added source attribute to logged events and identify calls

1.1.19 / 2014-04-22
==================

 * intercom: only update impressions on .active()
 * add mixpanel increments, closes #78
 * update intercom events, closes #80

1.1.18 / 2014-04-17
==================

 * Fixing ga universal for ip and useragent

1.1.17 / 2014-04-15
==================

 * ga-universal: add .ip and .userAgent override
 * ga: move settings check to enabled
 * hubspot: replace spaces in properties with underscores

1.1.16 / 2014-04-09
==================

 * Amplitude segment.io integration.

1.1.15 / 2014-04-09
==================

 * fix for google analytics universal client id
 * add drip
 * vero: ignore idless requests

1.1.14 / 2014-04-04
==================

 * webhooks: bumping timeout
 * iterable: adding revenue

1.1.13 / 2014-04-01
==================

 * churnbee: should only be enabled for messages with .event()

1.1.12 / 2014-04-01
==================

 * bumping segmentio-integration for timeout fixes
 * vero: add .alias()
 * add churnbee

1.1.11 / 2014-03-24
==================

 * webhooks: lowering timeout and retries
 * updating gitignore

1.1.10 / 2014-03-20
==================

 * vero: enable only for messages with userId

1.1.9 / 2014-03-19
==================

 * customer.io: adding fix for dates + ocd

1.1.8 / 2014-03-17
==================

 * stacklead: adding stacklead integration

1.1.7 / 2014-03-17
==================

 * ga: fix typos

1.1.6 / 2014-03-14
==================

 * mixpanel: actually require errors

1.1.5 / 2014-03-13
==================

 * add jscoverage, closes #44
 * kissmetrics: send revenue as billing amount

1.1.4 / 2014-03-13
==================

 * intercom: fix for dates
 * adding fix for customer.io group

1.1.3 / 2014-03-13
==================

 * webhooks: fix to re-enable everywhere

1.1.2 / 2014-03-13
==================

 * customerio: fix created_at

1.1.1 / 2014-03-11
==================

 * keen: adding fix for bad responses

1.1.0 / 2014-03-10
==================

 * fix user-agent to match new facade
 * remove some deps
 * adding iterable integration ([hjz](https://github.com/hjz))

1.0.0 / 2014-03-06
==================

 * refactor to use new integration

0.1.28 / 2014-02-27
==================

 * commandiq: adding commandiq
 * intercom: add group()
 * ga: add page()
 * customer.io: add group()

0.1.27 / 2014-02-18
==================

 * mailchimp: fix for messages which have no email field

0.1.26 / 2014-02-17
==================

 * add intercom track

0.1.25 / 2014-02-11
==================

 * updating segmentio-facade as a dev-dep
 * intercom: dates fix
 * removing facade from deps
 * updating `isodate-traverse` #0.3.0

0.1.24 / 2014-02-11
==================

 * adding valid-querystring checks
 * revert `request-retry` upgrade

0.1.23 / 2014-02-10
==================

 * updating to request-retry 0.1.1
 * Merge pull request #30 from segmentio/mailchimp
 * adding support for traits to send as merge vars
 * adding mailchimp integration, fixes #29

0.1.22 / 2014-01-20
===================

  * intercom: fix for traits.companies when sent as a non-array

0.1.21 / 2014-01-15
===================

  * customer.io: adding last visit updates

0.1.20 / 2013-12-16
===================

  * helpscout: fixed tests (yields)
  * customer.io: removing sessionid (reinpk)
  * preact: relaxing `email` requirement to send data

0.1.19 / 2013-12-03
===================

  * hubspot: adding json-stringifying to object values
  * hubspot: fixing existing contacts race condition


0.1.18 / 2013-12-02
===================

  * mixpanel: updating track calls to include correct ip information
  * hubspot: adding fix for null values

0.1.17 / 2013-11-27
===================

  * webhooks: fixing test timeout
  * helpscout: fixing single `websites` value
  * hubspot: fixing boolean/string field errors

0.1.16 / 2013-11-18
===================

  * fix for hubspot dates, convert them to ms

0.1.15 / 2013-11-13
===================

  * adding trak.io integration ([scootklein](https://github.com/scootklein))
  * updating intercom to no longer use `custom_data` field
  * updating package.json to use newer facade


0.1.14 / 2013-10-31
===================

  * woopra: updating with /identify call (calvinfo)

0.1.13 / 2013-10-16
===================

  * google-analytics: renaming 'universal' -> 'serversideClassic' (calvinfo)

0.1.12 / 2013-10-16
===================

  * preact: added preact integration ([thefarside112](https://github.com/thefarside112))
  * debug: renaming debug everywhere (calvinfo)

0.1.11 / 2013-10-08
===================

  * mixpanel: adding detection for invalid dates (calvinfo)

0.1.10 / 2013-10-08
===================

  * mixpanel: adding version to $os and $browser (calvinfo)

0.1.9 / 2013-10-08
==================

  * mixpanel: add Mixpanel special property $username to identify ([brianpmarks](https://github.com/brianpmarks))

0.1.8 / 2013-10-08
==================

  * google-analytics: checking for value, removing default value

0.1.7 / 2013-10-06
==================

  * webhooks: adding timeout to request

0.1.6 / 2013-09-30
==================

  * librato: updating user-agent with segmentio version

0.1.5 / 2013-09-29
==================

  * webhooks: increasing retry count
  * usercycle: adding usercycle by [lfittl](https://github.com/lfittl)
  * google-analytics: removing default value as set to '1' by [mattsjohnston](https://github.com/mattsjohnston)


0.1.4 / 2013-09-19
==================

  * intercom: removing ip and useragent from user update
  * intercom: adding impressions for track and identify

0.1.3 / 2013-09-16
==================

  * Adding userId check to intercom enabled

0.1.2 / 2013-09-13
==================

  * Renaming HelpScout -> Help Scout
  * updating version of segmentio/new-date


0.1.1 / 2013-09-06
==================

  * Adding fix for HubSpot lowercased keys


0.1.0 / 2013-08-29
==================

  * Initial release
