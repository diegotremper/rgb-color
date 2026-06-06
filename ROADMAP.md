

# rgb-color roadmap

This roadmap describes a compatibility-preserving modernization plan for `rgb-color`.

The goal is to refresh the project tooling, packaging, CI, and release process without breaking existing consumers.

## Guiding principles

- Preserve the current v2 public API.
- Keep the package small and dependency-light.
- Treat `dist` output as a public compatibility surface.
- Modernize tooling in small, reviewable PRs.
- Add safety checks before replacing build or packaging tools.
- Keep IE11-compatible browser output during the v2 line unless explicitly changed in a major version.

## Compatibility contract

The v2 package must continue to support:

- `require('rgb-color')`
- `dist/rgb-color.js`
- `dist/rgb-color.min.js`
- UMD/global browser usage via `rgbcolor`
- `rgbcolor(color).hex()`
- `rgbcolor(color).rgb()`
- `rgbcolor(color).channels()`
- `rgbcolor(color).isValid()`
- IE11-compatible generated browser bundles
- No runtime dependencies unless intentionally justified

Any modernization work must keep the compatibility verification suite passing:

```bash
npm run verify
```

## Phase 1: compatibility safety net

Status: completed.

Phase 1 adds automated checks that protect the existing public contract before changing the build system.

### Completed work

- Added `npm run verify:dist`.
- Added `npm run verify:pack`.
- Added `npm run verify:browser`.
- Added `npm run verify` as the full local compatibility suite.
- Added package tarball verification through a temporary consumer project.
- Added browser bundle verification for both normal and minified UMD bundles.
- Added a foundation for browser compatibility checks that can be extended with Playwright e2e tests.
- Added a regression check for environments where `Number.isNaN` is unavailable.
- Updated GitHub Actions to run the compatibility checks on Node 20, 22, and 24.

### Current local verification commands

```bash
npm run lint
npm test
npm run verify:dist
npm run verify:pack
npm run verify:browser
npm run verify
```


### What this protects

- Source linting remains clean.
- Build output is reproducible.
- Generated `dist` files are committed.
- The package tarball can be installed by a downstream consumer.
- CommonJS `require('rgb-color')` keeps working.
- Browser UMD global `rgbcolor` keeps working.
- Minified browser UMD global `rgbcolor` keeps working.
- The bundle remains safe in an IE11-like environment without `Number.isNaN`.

### Optional Playwright e2e layer

Playwright can be added as a real-browser compatibility layer on top of the existing Node and `vm`-based checks.

The current `verify:browser` script is intentionally lightweight and dependency-free. It validates the UMD bundles in a JavaScript sandbox. Playwright should complement that check by loading the generated bundles in actual browser engines.

Recommended scope:

- Test `dist/rgb-color.js` in Chromium, Firefox, and WebKit.
- Test `dist/rgb-color.min.js` in Chromium, Firefox, and WebKit.
- Verify the global `window.rgbcolor` function exists.
- Verify representative outputs for `hex()`, `rgb()`, `channels()`, and `isValid()`.
- Keep Playwright tests focused on the public browser contract, not implementation internals.

Suggested commands:

```bash
npm install --save-dev @playwright/test
npx playwright install --with-deps
npm run test:e2e
```

Suggested scripts:

```json
{
  "scripts": {
    "test:e2e": "npm run build && playwright test",
    "test:e2e:ui": "npm run build && playwright test --ui"
  }
}
```

Suggested files:

```text
playwright.config.js
test/e2e/browser-bundles.spec.js
```

CI can run Playwright as a separate job after the regular compatibility suite. Keeping it separate makes browser failures easier to diagnose and avoids slowing down the core Node matrix.

## Phase 2: standardize the build system

Status: planned.

Replace the custom `tools/build` script with a standard Rollup configuration while preserving the same public artifacts.

### Goals

- Move build configuration into `rollup.config.mjs`.
- Keep Rollup as the bundler.
- Keep Babel transpilation for IE11-compatible v2 browser output.
- Keep Terser for minified output.
- Preserve generated filenames exactly.
- Preserve sourcemap generation.
- Preserve UMD global name `rgbcolor`.
- Preserve `dist/package.json`, `dist/LICENSE.txt`, and `dist/README.md` generation.

### Required output compatibility

The build must continue producing:

```text
dist/rgb-color.js
dist/rgb-color.js.map
dist/rgb-color.min.js
dist/rgb-color.min.js.map
dist/package.json
dist/LICENSE.txt
dist/README.md
```

### Suggested implementation

- Add `rollup.config.mjs`.
- Keep `npm run build` as the public command.
- Either simplify `tools/build` to call Rollup or replace the script with `rollup --config`.
- Add a small helper script if needed to copy package metadata and docs into `dist`.
- Run `npm run verify` after the change.

### Acceptance criteria

- `npm run verify` passes.
- `dist` files are deterministic.
- Existing CommonJS usage still works.
- Existing UMD browser usage still works.
- Minified UMD output still works.
- IE11 compatibility checks still pass.

## Phase 3: package metadata modernization

Status: planned.

Modernize package metadata without breaking existing consumers.

### Goals

- Keep `main` pointing to the existing distributable entry.
- Add safe `exports` only if it does not block current supported import paths.
- Add `browser` metadata for bundlers.
- Consider adding `types` after TypeScript declarations are available.
- Keep `files` restricted to `dist` unless there is a deliberate publishing change.

### Compatibility cautions

Do not immediately:

- Add `"type": "module"`.
- Remove `main`.
- Remove `dist/rgb-color.js`.
- Remove `dist/rgb-color.min.js`.
- Remove the UMD build.
- Break deep imports to existing `dist` artifacts.

### Possible package metadata shape

```json
{
  "main": "./dist/rgb-color.js",
  "browser": "./dist/rgb-color.js",
  "exports": {
    ".": {
      "require": "./dist/rgb-color.js",
      "default": "./dist/rgb-color.js"
    },
    "./dist/rgb-color.js": "./dist/rgb-color.js",
    "./dist/rgb-color.min.js": "./dist/rgb-color.min.js"
  },
  "files": [
    "dist"
  ]
}
```

This should be validated with the package tarball smoke test before merging.

## Phase 4: TypeScript declarations

Status: planned.

Add TypeScript types without rewriting the implementation in TypeScript.

### Goals

- Provide types for TypeScript consumers.
- Preserve CommonJS compatibility.
- Avoid changing runtime behavior.
- Avoid a source rewrite until the build and package contracts are fully protected.

### Possible declaration shape

```ts
declare namespace rgbcolor {
  interface RGBColor {
    isValid(): boolean;
    rgb(): string;
    hex(): string;
    channels(): { r: number; g: number; b: number };
  }
}

declare function rgbcolor(color: unknown): rgbcolor.RGBColor;

export = rgbcolor;
```

### Acceptance criteria

- TypeScript users can import or require the package.
- Existing JavaScript consumers are unaffected.
- `npm run verify` passes.
- Optional type tests pass if added.

## Phase 5: CI and release automation

Status: planned.

Strengthen project automation around publishing and dependency maintenance.

### Goals

- Keep GitHub Actions as the main CI system.
- Keep testing on active Node versions.
- Keep compatibility checks required before merge.
- Add automated release notes and versioning.
- Add npm provenance when publishing.
- Keep Dependabot enabled for maintenance PRs.

### Candidate tools

- GitHub Actions for CI.
- Dependabot for dependency updates.
- Release Please for release PRs and changelog generation.
- npm provenance for trusted publishing.
- CodeQL for optional security scanning.
- Playwright for optional real-browser e2e compatibility checks.

### Suggested CI checks

- `npm ci`
- `npm run lint`
- `npm test`
- `npm run verify:dist`
- `npm run verify:pack`
- `npm run verify:browser`
- `npm pack --dry-run` or `npm pack --json`
- `npm run test:e2e` if Playwright is enabled

### Acceptance criteria

- Every PR runs the compatibility suite.
- Release PRs are generated automatically.
- Published package contents remain verified.
- Maintainers can publish with a documented process.

## Phase 6: documentation refresh

Status: planned.

Refresh documentation to match the compatibility contract and modern usage expectations.

### Goals

- Document installation.
- Document CommonJS usage.
- Document browser script usage.
- Document all public methods.
- Document supported color formats.
- Document compatibility policy.
- Document the development workflow.

### Suggested files

- `README.md`
- `CONTRIBUTING.md`
- `COMPATIBILITY.md`
- `ROADMAP.md`

### Compatibility notes to document

- v2 keeps UMD/browser global support.
- v2 keeps CommonJS support.
- v2 keeps IE11-compatible generated bundles unless changed by policy.
- Future v3 may revisit IE11 and module format support.

## Phase 7: decide alpha channel support

Status: open decision.

There is an old suggestion to support alpha by relying on packages like `rgb-hex` and `hex-rgb`. This should be treated as a product/API decision, not a tooling task.

### Options

1. Keep current RGB-only behavior.
2. Add alpha parsing while preserving existing RGB APIs.
3. Add alpha support only in a future major version.
4. Close the old suggestion as not planned.

### Recommendation

Keep v2 focused on RGB compatibility. If alpha support is desired, open a dedicated enhancement issue with API examples and backward compatibility rules.

## Phase 8: v3 planning

Status: future discussion.

A v3 release can consider breaking changes that should not happen in the v2 refresh.

### Possible v3 changes

- Drop IE11 support.
- Ship first-class ESM.
- Ship dual ESM and CommonJS outputs.
- Rename generated files.
- Stop committing `dist` to the repository.
- Rewrite source in TypeScript.
- Add alpha channel support.
- Revisit package exports and deep import support.

### v3 questions

- Should IE11 support be dropped?
- Should UMD browser output remain available?
- Should CommonJS remain supported?
- Should the package become ESM-first?
- Should the parser support alpha channels?
- Should runtime dependencies remain at zero?

## Proposed PR sequence

1. Add compatibility contract verification. Completed.
2. Standardize build with Rollup config.
3. Add package metadata improvements.
4. Add TypeScript declarations.
5. Add release automation.
6. Refresh documentation.
7. Decide what to do with alpha channel support.
8. Open a v3 planning issue.

## Current next step

Start Phase 2:

```bash
git checkout master
git pull
git checkout -b chore/rollup-config-build
```

Then replace the custom build script with a Rollup config while keeping `npm run verify` green.