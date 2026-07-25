import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { test } from "node:test";

const pages = ["index.html", "privacy/index.html", "terms/index.html"];

test("built site contains all public pages", async () => {
  for (const page of pages) await access(new URL(`../dist/${page}`, import.meta.url));
});

test("legal pages identify ScreenTrove and both languages", async () => {
  for (const page of pages.slice(1)) {
    const html = await readFile(new URL(`../dist/${page}`, import.meta.url), "utf8");
    assert.match(html, /ScreenTrove/);
    assert.match(html, /屏藏/);
    assert.match(html, /data-lang="zh"/);
    assert.match(html, /data-lang="en"/);
    assert.doesNotMatch(html, /ALC-001/);
  }
});

test("site has no placeholder contact details", async () => {
  for (const page of pages) {
    const html = await readFile(new URL(`../dist/${page}`, import.meta.url), "utf8");
    assert.doesNotMatch(html, /example\.com|TODO|your@email/i);
  }
});
