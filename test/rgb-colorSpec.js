const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { describe, it } = require('node:test');
const vm = require('node:vm');

const rgbcolor = require('../dist/rgb-color');

describe('rgbcolor', () => {
  describe('package entrypoints', () => {
    it('should expose a CommonJS function from the built package', () => {
      assert.equal(typeof rgbcolor, 'function');
      assert.equal(rgbcolor('darkblue').hex(), '#00008b');
    });

    it('should expose rgbcolor as the UMD browser global', () => {
      const code = fs.readFileSync(path.resolve(__dirname, '../dist/rgb-color.js'), 'utf8');
      const sandbox = {};

      vm.runInNewContext(code, sandbox);

      assert.equal(typeof sandbox.rgbcolor, 'function');
      assert.equal(sandbox.rgbcolor('darkblue').rgb(), 'rgb(0, 0, 139)');
    });

    it('should work when Number.isNaN is not available', () => {
      const code = fs.readFileSync(path.resolve(__dirname, '../dist/rgb-color.js'), 'utf8');
      const sandbox = {
        Number: Object.create(Number, {
          isNaN: {
            value: undefined,
          },
        }),
      };

      vm.runInNewContext(code, sandbox);

      assert.equal(sandbox.rgbcolor('#ffffff').hex(), '#ffffff');
    });

    it('should expose rgbcolor from the minified UMD build', () => {
      const code = fs.readFileSync(path.resolve(__dirname, '../dist/rgb-color.min.js'), 'utf8');
      const sandbox = {};

      vm.runInNewContext(code, sandbox);

      assert.equal(typeof sandbox.rgbcolor, 'function');
      assert.equal(sandbox.rgbcolor('darkblue').hex(), '#00008b');
    });
  });

  describe('hex(), rgb(), channels()', () => {
    const tests = [
      {
        input: '#', expectedHex: '#000000', expectedRGB: 'rgb(0, 0, 0)', expectedValid: false, expectedObject: { r: 0, g: 0, b: 0 },
      },
      {
        input: '#ijm', expectedHex: '#000000', expectedRGB: 'rgb(0, 0, 0)', expectedValid: true, expectedObject: { r: 0, g: 0, b: 0 },
      },
      {
        input: 'aqua', expectedHex: '#00ffff', expectedRGB: 'rgb(0, 255, 255)', expectedValid: true, expectedObject: { r: 0, g: 255, b: 255 },
      },
      {
        input: 'mistyrose', expectedHex: '#ffe4e1', expectedRGB: 'rgb(255, 228, 225)', expectedValid: true, expectedObject: { r: 255, g: 228, b: 225 },
      },
      {
        input: 'yellowgreen', expectedHex: '#9acd32', expectedRGB: 'rgb(154, 205, 50)', expectedValid: true, expectedObject: { r: 154, g: 205, b: 50 },
      },
      {
        input: '#fff', expectedHex: '#ffffff', expectedRGB: 'rgb(255, 255, 255)', expectedValid: true, expectedObject: { r: 255, g: 255, b: 255 },
      },
      {
        input: '000', expectedHex: '#000000', expectedRGB: 'rgb(0, 0, 0)', expectedValid: true, expectedObject: { r: 0, g: 0, b: 0 },
      },
      {
        input: 'rgb(0, 23, 255)', expectedHex: '#0017ff', expectedRGB: 'rgb(0, 23, 255)', expectedValid: true, expectedObject: { r: 0, g: 23, b: 255 },
      },
      {
        input: '#336699', expectedHex: '#336699', expectedRGB: 'rgb(51, 102, 153)', expectedValid: true, expectedObject: { r: 51, g: 102, b: 153 },
      },
      {
        input: 'ffee66', expectedHex: '#ffee66', expectedRGB: 'rgb(255, 238, 102)', expectedValid: true, expectedObject: { r: 255, g: 238, b: 102 },
      },
      {
        input: 'fb0', expectedHex: '#ffbb00', expectedRGB: 'rgb(255, 187, 0)', expectedValid: true, expectedObject: { r: 255, g: 187, b: 0 },
      },
      {
        input: 'red', expectedHex: '#ff0000', expectedRGB: 'rgb(255, 0, 0)', expectedValid: true, expectedObject: { r: 255, g: 0, b: 0 },
      },
      {
        input: 'darkblue', expectedHex: '#00008b', expectedRGB: 'rgb(0, 0, 139)', expectedValid: true, expectedObject: { r: 0, g: 0, b: 139 },
      },
      {
        input: 'cadet blue', expectedHex: '#5f9ea0', expectedRGB: 'rgb(95, 158, 160)', expectedValid: true, expectedObject: { r: 95, g: 158, b: 160 },
      },
      {
        input: 'rgb(900, 300, 257)', expectedHex: '#ffffff', expectedRGB: 'rgb(255, 255, 255)', expectedValid: true, expectedObject: { r: 255, g: 255, b: 255 },
      },
    ];

    tests.forEach((test) => {
      it(`should return correct hex(), rgb() and object() representation of ${test.input}`, () => {
        const color = rgbcolor(test.input);
        assert.equal(color.isValid(), test.expectedValid);
        assert.equal(color.hex(), test.expectedHex);
        assert.equal(color.rgb(), test.expectedRGB);
        assert.deepEqual(color.channels(), test.expectedObject);
      });
    });

  });

  describe('isValid() === false', () => {
    [null, undefined, '', false, true, String, function cb() {}].forEach((invalidInput) => {
      it('should not be a valid input color', () => {
        const rgbColor = rgbcolor(invalidInput);
        assert.equal(rgbColor.isValid(), false);
      });
    });
  });

});
