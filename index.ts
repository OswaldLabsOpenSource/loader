import { readFile } from "fs";
import { join } from "path";
import fastify from "fastify";
const server = fastify();

readFile(join(__dirname, "loader.js"), (error, data) => {
  if (error) throw new Error(error.message);
  server.get("/:apikey", (request, reply) => {
    const script = request.params.apikey.includes("staging-")
      ? data.toString().replace("secure-agastya-cdn", "staging-agastya-cdn")
      : data.toString();
    const loader =
      script +
      `window.a11ySettings=window.a11ySettings||{};window.a11ySettings.token="${encodeURIComponent(
        request.params.apikey.replace("staging-", "").replace(".js", "")
      ) || "demo"}";\n`;
    reply
      .code(200)
      .header("ETag", "oswald-labs-3cdebe")
      .header("Content-Type", "application/javascript; charset=utf-8")
      .header("Cache-Control", "public, max-age=31556926")
      .send(loader);
  });
  server.listen(8080, (error, address) => {
    if (error) throw new Error(error.message);
    console.log(`Agastya Loader listening on ${address}`);
  });
});
