/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { expect } from 'chai';
import rgbcolor from '../src/rgb-color';

describe('rgbcolor', () => {

  describe('hex(), rgb(), channels()', () => {
    const tests = [
      { input: 'aqua', expectedHex: '#00ffff', expectedRGB: 'rgb(0, 255, 255)', expectedObject: { r: 0, g: 255, b: 255 } },
      { input: 'mistyrose', expectedHex: '#ffe4e1', expectedRGB: 'rgb(255, 228, 225)', expectedObject: { r: 255, g: 228, b: 225 } },
      { input: 'yellowgreen', expectedHex: '#9acd32', expectedRGB: 'rgb(154, 205, 50)', expectedObject: { r: 154, g: 205, b: 50 } },
      { input: '#fff', expectedHex: '#ffffff', expectedRGB: 'rgb(255, 255, 255)', expectedObject: { r: 255, g: 255, b: 255 } },
      { input: '000', expectedHex: '#000000', expectedRGB: 'rgb(0, 0, 0)', expectedObject: { r: 0, g: 0, b: 0 } },
      { input: 'rgb(0, 23, 255)', expectedHex: '#0017ff', expectedRGB: 'rgb(0, 23, 255)', expectedObject: { r: 0, g: 23, b: 255 } },
      { input: '#336699', expectedHex: '#336699', expectedRGB: 'rgb(51, 102, 153)', expectedObject: { r: 51, g: 102, b: 153 } },
      { input: 'ffee66', expectedHex: '#ffee66', expectedRGB: 'rgb(255, 238, 102)', expectedObject: { r: 255, g: 238, b: 102 } },
      { input: 'fb0', expectedHex: '#ffbb00', expectedRGB: 'rgb(255, 187, 0)', expectedObject: { r: 255, g: 187, b: 0 } },
      { input: 'red', expectedHex: '#ff0000', expectedRGB: 'rgb(255, 0, 0)', expectedObject: { r: 255, g: 0, b: 0 } },
      { input: 'darkblue', expectedHex: '#00008b', expectedRGB: 'rgb(0, 0, 139)', expectedObject: { r: 0, g: 0, b: 139 } },
      { input: 'cadet blue', expectedHex: '#5f9ea0', expectedRGB: 'rgb(95, 158, 160)', expectedObject: { r: 95, g: 158, b: 160 } },
      { input: 'rgb(900, 300, 257)', expectedHex: '#ffffff', expectedRGB: 'rgb(255, 255, 255)', expectedObject: { r: 255, g: 255, b: 255 } },
    ];

    tests.forEach((test) => {
      it(`should return correct hex(), rgb() and object() representation of ${test.input}`, () => {
        const color = rgbcolor(test.input);
        expect(color.isValid()).to.be.equal(true);
        expect(color.hex()).to.be.equal(test.expectedHex);
        expect(color.rgb()).to.be.equal(test.expectedRGB);
        expect(color.channels()).to.deep.equal(test.expectedObject);
      });
    });

  });

  describe('isValid() === false', () => {
    [null, undefined, '', false, true, String, function cb() {}].forEach((invalidInput) => {
      it('should not be a valid input color', () => {
        const rgbColor = rgbcolor(invalidInput);
        expect(rgbColor.isValid()).to.be.equal(false);
      });
    });
  });

});
