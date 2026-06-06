/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const rollup = require('rollup');
const babel = require('@rollup/plugin-babel').default;
const terser = require('@rollup/plugin-terser');
const pkg = require('../package.json');

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => {
  fs.rmSync('dist', { recursive: true, force: true });
  fs.mkdirSync('dist');
});

const plugins = [
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    presets: [
      ['@babel/preset-env', {
        modules: false,
        targets: {
          ie: '11',
        },
      }],
    ],
  }),
];

// Compile source code into a distributable format with Babel
['umd'].forEach((format) => {
  promise = promise.then(() => rollup.rollup({
    input: 'src/rgb-color.js',
    external: Object.keys(pkg.dependencies || {}),
    plugins,
  }).then(bundle => bundle.write({
    file: 'dist/rgb-color.js',
    format,
    sourcemap: true,
    name: 'rgbcolor',
  })));
});

['umd'].forEach((format) => {
  promise = promise.then(() => rollup.rollup({
    input: 'src/rgb-color.js',
    external: Object.keys(pkg.dependencies || {}),
    plugins: plugins.concat(terser()),
  }).then(bundle => bundle.write({
    file: 'dist/rgb-color.min.js',
    format,
    sourcemap: true,
    name: 'rgbcolor',
  })));
});

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
  delete pkg.private;
  delete pkg.devDependencies;
  delete pkg.scripts;
  delete pkg.files;
  delete pkg.engines;
  pkg.dependencies = pkg.dependencies || {};
  pkg.main = 'rgb-color.js';
  fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '  '), 'utf-8');
  fs.writeFileSync('dist/LICENSE.txt', fs.readFileSync('LICENSE.txt', 'utf-8'), 'utf-8');
  fs.writeFileSync('dist/README.md', fs.readFileSync('README.md', 'utf-8'), 'utf-8');
});

promise.catch(err => console.error(err.stack));
