/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import RGBColor from '../src/rgb-color';

describe('RGBColor', () => {

  describe('rgbColor.toHex()', () => {
    const tests = [
      { input: 'aqua', expected: '#00ffff' },
      { input: 'mistyrose', expected: '#ffe4e1' },
      { input: 'yellowgreen', expected: '#9acd32' },
      { input: '#fff', expected: '#ffffff' },
      { input: '000', expected: '#000000' },
      { input: 'rgb(0, 23, 255)', expected: '#0017ff' },
      { input: '#336699', expected: '#336699' },
      { input: 'ffee66', expected: '#ffee66' },
      { input: 'fb0', expected: '#ffbb00' },
      { input: 'red', expected: '#ff0000' },
      { input: 'darkblue', expected: '#00008b' },
      { input: 'cadet blue', expected: '#5f9ea0' },
      { input: 'rgb(900, 300, 257)', expected: '#ffffff' },
    ];

    tests.forEach((test) => {
      it(`should return correct hex representation of ${test.input}`, () => {
        const rgbColor = new RGBColor(test.input);
        const color = rgbColor.toHex();
        expect(rgbColor.ok).to.be.equal(true);
        expect(color).to.be.equal(test.expected);
      });
    });

  });

  describe('rgbColor.toRGB()', () => {
    const tests = [
      { input: 'aqua', expected: 'rgb(0, 255, 255)' },
      { input: 'mistyrose', expected: 'rgb(255, 228, 225)' },
      { input: 'yellowgreen', expected: 'rgb(154, 205, 50)' },
      { input: '#fff', expected: 'rgb(255, 255, 255)' },
      { input: '000', expected: 'rgb(0, 0, 0)' },
      { input: 'rgb(0, 23, 255)', expected: 'rgb(0, 23, 255)' },
      { input: '#336699', expected: 'rgb(51, 102, 153)' },
      { input: 'ffee66', expected: 'rgb(255, 238, 102)' },
      { input: 'fb0', expected: 'rgb(255, 187, 0)' },
      { input: 'red', expected: 'rgb(255, 0, 0)' },
      { input: 'darkblue', expected: 'rgb(0, 0, 139)' },
      { input: 'cadet blue', expected: 'rgb(95, 158, 160)' },
      { input: 'rgb(900, 300, 257)', expected: 'rgb(255, 255, 255)' },
    ];

    tests.forEach((test) => {
      it(`should return correct rgb representation of ${test.input}`, () => {
        const rgbColor = new RGBColor(test.input);
        const color = rgbColor.toRGB();
        expect(rgbColor.ok).to.be.equal(true);
        expect(color).to.be.equal(test.expected);
      });
    });

  });
});
