import { readFile } from "fs";
import { join } from "path";
import fastify from "fastify";
const server = fastify();

readFile(join(__dirname, "loader.js"), (error, data) => {
  if (error) throw new Error(error.message);
  server.get("/:apikey", (request, reply) => {
    const loader =
      data.toString() +
      `window.a11ySettings=window.a11ySettings||{};window.a11ySettings.token="${encodeURIComponent(
        request.params.apikey.replace(".js", "")
      ) || "demo"}";`;
    reply
      .code(200)
      .header("ETag", "oswald-labs-3cdebe")
      .header("Content-Type", "application/javascript; charset=utf-8")
      .header("Cache-Control", "public, max-age=31556926")
      .send(loader);
  });
  server.listen(3008, (error, address) => {
    if (error) throw new Error(error.message);
    console.log(`Agastya Loader listening on ${address}`);
  });
});
