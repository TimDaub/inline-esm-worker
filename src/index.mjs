//@format
import { Worker } from "worker_threads";
import { once } from "events";
import process from "process";

export default function run(code) {
  return new Promise(async (resolve, reject) => {
    const worker = new Worker(new URL(`data:text/javascript,${code}`), {
      stdout: true,
      execArgv: [...process.execArgv, "--unhandled-rejections=strict"]
    });

    worker.on("error", reject);

    let buf;
    for await (let chunk of worker.stdout) {
      if (!buf) {
        buf = chunk;
      } else {
        buf = Buffer.concat([buf, chunk]);
      }
    }

    if (buf && buf.length > 0) {
      console.log(buf.toString());
    }

    resolve(buf);
  });
}
