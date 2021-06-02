//@format
import test from "ava";

import run from "../src/index.mjs";

test("if worker can run simple command", async t => {
  const msg = "hello world";
  const actual = await run(`console.log('${msg}')`);
  t.is(msg, actual.toString().trim());
});

test("if worker can run a script with a json output", async t => {
  const msg = { hello: "world" };
  const actual = await run(`console.log('${JSON.stringify(msg)}')`);
  t.deepEqual(msg, JSON.parse(actual.toString()));
});

test("if errors are thrown and caught by the worker", async t => {
  await t.throwsAsync(
    async () => await run(`throw new Error("something went wrong")`)
  );
});
