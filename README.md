# all-done

**Execute a function when pre-conditions have been satisfied (probably asynchronously).**

[![Build Status](https://travis-ci.org/toboid/and.js.svg?branch=master)](https://github.com/toboid/and.js)
[![Dependencies](https://david-dm.org/toboid/js-pointer.svg)](https://github.com/toboid/js-pointer/blob/master/package.json)
[![Dependencies](https://david-dm.org/toboid/and.js.svg)](https://github.com/toboid/and.js/blob/master/package.json)
[![npm version](https://badge.fury.io/js/and.js.svg)](https://badge.fury.io/js/and.js)

Whilst JavaScript is single-threaded, it's async nature means that there can be multiple logical processes. `all-done` is a tiny utility to assist with synchronising (joining) asynchronous calls. This is conceptually similar to [`Promise.all`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) from the JavaScript promise api, or `Thread.join` in Java or C#.

## Getting started
Install via NPM
```
  npm i js-pointer --save
```

Example usage
``` javascript
const all = All();
const firstThingDone = all.track();
const secondThingDone = all.track();
all.finished((allArgs) => {
  // Do something now we now that firstThingDone and secondThingDone have both been executed
  console.log(allArgs[0]); // outputs ['first optional param']
});

setTimeout(() => {
  firstThingDone('first optional param');
}, 100);

setTimeout(() => {
  secondThingDone('second optional param');
}, 200);
```

## API
<dl>
  <dt>`All()`</dt>
  <dd>Creates a new all tracking object</dd>

  <dt>`all.track()`</dt>
  <dd>Returns a tracking function, when all tracking functions have been executed, the finished handler is executed. Any parameters passed to the tracking function are also passed to the finished handler.</dd>
  
  <dt>`all.finished(handler)`</dt>
  <dd>Takes a handling function as a parameter which is executed when all created tracking functions have been executed. The handler receives the parameters passed to the tracking functions, in the order that the tracking functions were created with `all.track()`.</dd>
</dl>
 
## License
MIT

