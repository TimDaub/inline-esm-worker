//@format
import { Worker } from "worker_threads";
import { once } from "events";

export default async function run(code) {
  const worker = new Worker(new URL(`data:text/javascript,${code}`), {
    stdout: true
  });

  let buf;
  for await (let chunk of worker.stdout) {
    if (!buf) {
      buf = chunk;
    } else {
      buf = Buffer.concat([buf, chunk]);
    }
  }

  return buf;
}
