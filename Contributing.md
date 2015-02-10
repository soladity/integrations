# Contributing

We're huge fans of open-source, and we absolutely love getting good contributions! Integrations are available to thousands of Segment customers and we have hundreds of integrations in already in our queue, so it's important that you do the following _before starting any work on your integration_.

  1. Apply to be a Segment partner: https://segment.com/partners/
  2. Hear from the Segment team with the details for submitting your pull request.

Once your request is approved, we'll create a new repo your integration, that you can submit a pull request to.

## Getting Setup

To start, you should copy the project structure of our [webhooks integration](https://github.com/segmentio/integration-webhooks). Be sure to replace any reference to "webhooks" with the name of your integration. We're actively working on tools to automate this process, stay tuned!

### Methods

We currently define 6 standard methods: __identify__, __track__, __page__, __screen__, __group__, __alias__. See our [tracking API](https://segment.io/docs/tracking-api/) to check what each method does. If your integration does not support a method, just omit it from the prototype.

### Channels

We currently have 3 channels, add all channels you want your integration to support.
Note that if your integration is bundled in analytics.js you should omit the `client` channel.

  ```js
  channels(['server', 'mobile', 'client'])
  ```

### Settings

When a Segment user first turns on the integration, they'll be asked to enter settings specific to the integration.

![](https://i.cloudup.com/btVoto0faC.png)

These are typically fields like:

  - API Keys
  - whether to track pageviews
  - mappings from Segment events to integration specific events

As a good rule of thumb, any option in the integration should be a separate key in the `settings` object. These will be stored as `this.settings` on the integration itself.

### Validation

You can ensure the settings has `key`, or the message has `path` easily using `ensure()`.

```js
.ensure('settings.apiKey')
.ensure('message.userId')
.ensure('message.context.ip')
```

The above example will ensure that the user has an `apiKey` and the message has an `userId` and `ip`, otherwise the integration
will reject the call automatically.

### Dynamic validation.

You can dymanically decide to reject a message by providing a function to `.ensure()`.

```js
/**
 * Mixpanel requires an `.apiKey` on `track`
 * if the message is older than 5 days.
 */

Mixpanel.ensure(function(msg, settings){
  if (settings.apiKey) return;
  if ('track' != msg.type()) return;
  if (!shouldImport(msg)) return;
  return this.invalid('.apiKey is required if "track" message is older than 5 days.');
});
```

Note that for invalid settings you must use `.invalid(msg)`, for invalid
messages you must use `.reject(msg)`.

### Validation tests

The generated integration will contain some tests.

```js
it('should have the correct settings', function(){
  test
    .name('My Integration')
    .channels(['server', 'mobile', 'client'])
    .ensure('settings.apiKey')
    .ensure('message.userId')
    .ensure('message.context.ip')
    .retries(2);
});

describe('.validate()', function() {
  var msg;

  beforeEach(function(){
    msg = {
      userId: 'user-id',
      type: 'identify',
      context: { ip: '0.0.0.0' }
    };
  });

  it('should not be valid without an api key', function(){
    delete settings.apiKey;
    test.invalid(msg, settings);
  });

  it('should not be valid without a userId', function(){
    delete msg.userId;
    test.invalid(msg, settings);
  });

  it('should not be valid without a context.ip', function(){
    delete msg.context.ip;
    test.invalid(msg, settings);
  });

  it('should be valid with complete message and settings', function(){
    test.valid(msg, settings);
  });
});
```

### Mapper

To see what methods are available on `msg`, check out [facade](https://github.com/segmentio/facade).

A mapper should receive a raw `msg` of `Facade` and return a payload, the payload
is then passed to the method in order to send it out:

Suppose the API only accepts `$user_id` and `$name`
You can add a `mapper.identify` that does the mappings for you.


```js
// my-integration/mapper.js
exports.identify = function(msg, settings){
  return {
    $user_id: msg.userId(),
    $name: msg.name(),
  }
};
```

Then `identify` will receive `{ $user_id: '811a5bdd', $name: 'john doe' }` to send.

```js
// my-integration/index.js
MyIntegration.prototype.identify = function(payload, fn){
  return this
    .post()
    .auth(this.settings.apiKey)
    .type('json')
    .send(payload)
    .end(this.handle(fn));
};
```

### Dynamic Mapper

It's useful to dynamically call the mapper sometimes and not have it
do it's magic behind the scenes.

To call the mapper directly make sure you remove `.mapper(mapper)`
from the integration generator, that way `identify()` will receive
the message and can just call / not call the mapper.

```js
var MyIntegration = module.exports = integration('My Integration')
  .endpoint('https://api.my-integration.com/v1')
  .ensure('settings.apiKey')
  .ensure('message.userId')
  .mapper(mapper)
  .retries(2);
```

```js
var MyIntegration = module.exports = integration('My Integration')
  .endpoint('https://api.my-integration.com/v1')
  .ensure('settings.apiKey')
  .ensure('message.userId')
  .retries(2);
```

```js
MyIntegration.prototype.identify = function(msg, fn){
  var json = mapper.identify(msg);
  return this;
};
```

### Mapper tests

The generated integration will contain `test/fixtures/*.json`,
Each `json` file contains `input` and `output`, where input
is just the raw message you expect to receive, and output is
the raw payload you expect to be sent.

to test them out, simply call `test.maps('my-fixture-name')`:

```js
  describe('identify', function(){
    it('should map basic identify', function(){
      test.maps('identify-basic');
    });
  });
```

### Request tests

You can reuse the generated fixtures to test requests as well:

```js
  it('should send basic identify', function(done){
    var json = test.fixture('identify-basic');
    test
      .identify(json.input)
      .sends(json.output)
      .expects(200)
      .end(done);
  });
```

### Running tests

You can run your integration tests with `make`.

```bash
$ make test
```

### Checklist

  - When making a fix, first write a breaking test for it
  - Make sure your tests are complete and passing
  - Make sure you follow the style of the rest of our integrations
  - Run `make lint` and make sure that it doesn't complain
  - Make sure new intgration tests have fixtures
  - Send demo account credentials to integrations@segment.com

### Pull request

Once your integration is ready for review, submit a pull request to the repo that the Segment team provided for you in response to [applying to join of our platform](https://segment.com/docs/partners/join-the-platform/). _Please do not submit pull requests to this repo._

### Questions

For questions about these docs, pull requests and fixes please contact integrations@segment.com. For other business/partnerships inquiries please contact partners@segment.com
