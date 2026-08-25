import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Mango experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Mango — share vividly<\/title>/i);
  assert.match(html, /id="device"/);
  assert.match(html, /id="app"/);
  assert.match(html, /mango · share vividly/i);
  assert.match(html, /\/mango\/app\.js/);
  assert.match(html, /http:\/\/localhost(?::3000)?\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/i);
});

test("ships product-specific source and metadata", async () => {
  const [page, layout, script, css, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/mango/app.js", import.meta.url), "utf8"),
    readFile(new URL("../app/mango.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /strategy="afterInteractive"/);
  assert.match(layout, /Mango — share vividly/);
  assert.match(layout, /images: \[imageUrl\]/);
  assert.match(script, /const MAGIC = \[/);
  assert.match(script, /function renderComposer\(/);
  assert.match(script, /function renderChat\(/);
  assert.match(css, /\.device\s*\{/);
  assert.match(css, /\.onboard\s*\{\s*padding:\s*76px/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
