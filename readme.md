# inline-esm-worker

> A node.js worker_thread Worker that runs once, can load modules and
> returns stdout

## installation

```bash
$ npm i inline-esm-worker
```

## usage

```js
import run from "inline-esm-worker";

const script = `console.log("hello world")`;
const capturedStdout = await run(script);
console.log(capturedStdout);
> hello world
```

## changelog

### 0.0.1

- Initial release

## license

See LICENSE file
