const { test, expect } = require('@playwright/test');
const path = require('node:path');

const bundles = [
  'rgb-color.js',
  'rgb-color.min.js',
];

for (const bundle of bundles) {
  test(`${bundle} exposes rgbcolor as a browser global`, async ({ page }) => {
    await page.goto('about:blank');

    await page.addScriptTag({
      path: path.resolve(__dirname, '..', '..', 'dist', bundle),
    });

    const result = await page.evaluate(() => ({
      type: typeof globalThis.rgbcolor,
      hex: globalThis.rgbcolor('#ffffff').hex(),
      rgb: globalThis.rgbcolor('darkblue').rgb(),
      channels: globalThis.rgbcolor('rgb(900, 300, 257)').channels(),
      valid: globalThis.rgbcolor('#ffffff').isValid(),
      invalid: globalThis.rgbcolor(null).isValid(),
    }));

    expect(result).toEqual({
      type: 'function',
      hex: '#ffffff',
      rgb: 'rgb(0, 0, 139)',
      channels: { r: 255, g: 255, b: 255 },
      valid: true,
      invalid: false,
    });
  });
}