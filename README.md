# all-finished

**Execute a function when pre-conditions have been satisfied (probably asynchronously).**

Whilst JavaScript is single-threaded, it's async nature means that there can be multiple logical processes. `all-finished` is a tiny utility to assist with synchronising asynchronous calls. This is conceptually similar to [`Promise.all`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) from the JavaScript promise api, or `Thread.join` in Java or C#.

## Getting started
Install via NPM
```bash
npm i all-finished --save
```

Example usage
```javascript
const AllFinished = require('all-finished');

const all = AllFinished();
const firstThingDone = all.track();
const secondThingDone = all.track();

all.finished((allArgs) => {
  // Do something now that firstThingDone and secondThingDone have both been executed
  console.log(allArgs[0]); // => ['first optional param']
});

setTimeout(() => {
  firstThingDone('first optional param');
}, 100);

setTimeout(() => {
  secondThingDone('second optional param');
}, 200);
```

## API
### All()
Creates a new all tracking object.
### all.track()
Returns a tracking function, when all tracking functions have been executed, the finished handler is executed. Any parameters passed to the tracking function are also passed to the finished handler.
### all.finished(handler)
Takes a handling function as a parameter which is executed when all created tracking functions have been executed. The handler receives the parameters passed to the tracking functions, in the order that the tracking functions were created with `all.track()`.

## License
MIT

