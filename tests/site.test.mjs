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

test("homepage links App Store and ships app assets", async () => {
  const html = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");
  assert.match(html, /apps\.apple\.com\/cn\/app\/id6782530093/);
  assert.match(html, /assets\/app-icon\.png/);
  for (const shot of ["auto-organize-iphone", "auto-categorize-iphone", "text-search-iphone", "on-device-iphone", "privacy-first-iphone"]) {
    assert.match(html, new RegExp(`assets/screens/${shot}\\.webp`));
    await access(new URL(`../dist/assets/screens/${shot}.webp`, import.meta.url));
  }
  for (const shot of ["auto-organize-ipad", "text-search-ipad", "auto-categorize-ipad", "privacy-control-ipad"]) {
    await access(new URL(`../dist/assets/screens/${shot}.webp`, import.meta.url));
  }
});

test("legal pages cover subscription and support email", async () => {
  const privacy = await readFile(new URL("../dist/privacy/index.html", import.meta.url), "utf8");
  const terms = await readFile(new URL("../dist/terms/index.html", import.meta.url), "utf8");
  assert.match(privacy, /mrleedynasty@gmail\.com/);
  assert.match(privacy, /App Store|App Store/);
  assert.match(terms, /mrleedynasty@gmail\.com/);
  assert.match(terms, /自动续订|auto-renew/);
});
