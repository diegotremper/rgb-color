#!/usr/bin/env node

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const bundles = [
  'dist/rgb-color.js',
  'dist/rgb-color.min.js',
];

for (const bundlePath of bundles) {
  const code = fs.readFileSync(path.resolve(bundlePath), 'utf8');

  {
    const sandbox = {};

    vm.runInNewContext(code, sandbox);

    assert.equal(typeof sandbox.rgbcolor, 'function', `${bundlePath} should expose rgbcolor`);
    assert.equal(sandbox.rgbcolor('#ffffff').hex(), '#ffffff');
    assert.equal(sandbox.rgbcolor('darkblue').rgb(), 'rgb(0, 0, 139)');
  }

  {
    const sandbox = {
      Number: Object.create(Number, {
        isNaN: {
          value: undefined,
        },
      }),
    };

    vm.runInNewContext(code, sandbox);

    assert.equal(
      sandbox.rgbcolor('#ffffff').hex(),
      '#ffffff',
      `${bundlePath} should work without Number.isNaN`,
    );
  }
}

console.log('Browser bundle verification passed.');
