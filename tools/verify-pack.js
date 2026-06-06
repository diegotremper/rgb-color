#!/usr/bin/env node

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    encoding: 'utf8',
    stdio: options.stdio || 'pipe',
    cwd: options.cwd || process.cwd(),
  });
}

const repoRoot = process.cwd();
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rgb-color-pack-'));

run('npm', ['run', 'build'], { stdio: 'inherit' });

const packOutput = run('npm', ['pack', '--json']);
const [packInfo] = JSON.parse(packOutput);

assert.ok(packInfo.filename, 'npm pack should produce a package tarball');

const tarball = path.join(repoRoot, packInfo.filename);
const consumerDir = path.join(tmpDir, 'consumer');

fs.mkdirSync(consumerDir);

fs.writeFileSync(
  path.join(consumerDir, 'package.json'),
  JSON.stringify({ private: true, name: 'rgb-color-consumer' }, null, 2),
);

run('npm', ['install', tarball], {
  cwd: consumerDir,
  stdio: 'inherit',
});

const smokeTest = `
const assert = require('node:assert/strict');
const rgbcolor = require('rgb-color');

assert.equal(typeof rgbcolor, 'function');
assert.equal(rgbcolor('#ffffff').hex(), '#ffffff');
assert.equal(rgbcolor('darkblue').rgb(), 'rgb(0, 0, 139)');
assert.deepEqual(rgbcolor('rgb(900, 300, 257)').channels(), { r: 255, g: 255, b: 255 });
`;

fs.writeFileSync(path.join(consumerDir, 'smoke-test.cjs'), smokeTest);

run('node', ['smoke-test.cjs'], {
  cwd: consumerDir,
  stdio: 'inherit',
});

const expectedFiles = new Set([
  'LICENSE.txt',
  'README.md',
  'package.json',
  'dist/LICENSE.txt',
  'dist/README.md',
  'dist/package.json',
  'dist/rgb-color.js',
  'dist/rgb-color.js.map',
  'dist/rgb-color.min.js',
  'dist/rgb-color.min.js.map',
]);

const actualFiles = new Set(packInfo.files.map(file => file.path));

for (const file of expectedFiles) {
  assert.ok(actualFiles.has(file), `missing expected package file: ${file}`);
}

for (const file of actualFiles) {
  assert.ok(expectedFiles.has(file), `unexpected package file: ${file}`);
}

fs.rmSync(tarball, { force: true });

console.log('Package verification passed.');
