//@format
import test from "ava";

import run from "../src/index.mjs";

test("if async functions can be handled", async t => {
  const fn = `
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log("hello");
  `;
  await run(fn);
  t.pass();
});

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

test('if iife can have a comment', async t => {
  const msg = 'Printed from inside async IIFE'
  const fn = `
    (async () => {
      // Prints to terminal
      /* Logs to console */
      console.log('${msg}')
    })()
  `
  const actual = await run(fn);
  t.is(msg, actual.toString().trim());
})

test('if es6 modules can be imported', async t => {
  const msg = 'ES6 style import works'
  const fn = `
    import fs from 'fs'
    console.log('${msg}')
  `
  const actual = await run(fn);
  t.is(msg, actual.toString().trim());
})
