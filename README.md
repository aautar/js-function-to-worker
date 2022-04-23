# js-function-to-worker

Experiment with providing an elegant interface to allow executing a JavaScript function within a [Web Worker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), allowing for easily taking advantage of additional CPU cores. 

## Limitations
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) are used as the communication mechanism to return data from the worker back to the caller, as such the JavaScript function being "worker-ized" must return a Promise
- The argument passed to the function need to be a JSON object, `JSON.stringify()` is called to produce JSON which is passed to the worker
- The JavaScript function can't have any dependencies beyond the function itself

## How this works
The JavaScript function is turned into a string, which is then used to create a `Blob`, which is then converted to an object URL via `URL.createObjectURL()`; that string contains a bit of additional logic to wait for the function's Promise to be fulfilled and call `postMessage` with the fulfillment result. The [executor wrapper](https://github.com/aautar/js-function-to-worker/blob/master/function-worker-executor.js), returns a Promise with the value from the worker.
