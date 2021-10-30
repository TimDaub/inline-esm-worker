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
> hello world
// capturedStdout is a buffer you can use for further evaluation of the script
```

**notes**:

- any errors thrown within the script input of `run` are propagated to the user
and are hence catchable.

## changelog

### 0.0.4

- URL encode code to prevent syntax errors

### 0.0.3

- Redirect worker's stdout to runtime of user

### 0.0.2

- `run(script)` is throwing errors that originate in running `script`.

### 0.0.1

- Initial release

## license

See LICENSE file
