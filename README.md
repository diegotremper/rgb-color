# RGBColor

[![NPM version](https://img.shields.io/npm/v/rgb-color.svg?style=flat-square)](https://www.npmjs.com/package/rgb-color)
[![NPM downloads](http://img.shields.io/npm/dm/rgb-color.svg?style=flat-square)](https://www.npmjs.com/package/rgb-color)
[![Build Status](http://img.shields.io/travis/diegotremper/rgb-color/master.svg?style=flat-square)](https://travis-ci.org/diegotremper/rgb-color)
[![Coverage Status](https://img.shields.io/coveralls/diegotremper/rgb-color.svg?style=flat-square)](https://coveralls.io/github/diegotremper/rgb-color)
[![Dependency Status](http://img.shields.io/david/diegotremper/rgb-color.svg?style=flat-square)](https://david-dm.org/diegotremper/rgb-color#info=dependencies)
[![Online Chat](https://img.shields.io/badge/chat_room-%23rgb-color.svg?style=flat-square)](https://gitter.im/rgb-color)

> A JavaScript class that accepts a string and tries to figure out a valid color out of it. Thanks to Stoyan Stefanov: http://www.phpied.com/rgb-color-parser-in-javascript/

### Installation

```sh
$ npm install rgb-color -D
```

### How to use

```javascript
var rgbColor = new RGBColor('darkblue');
if (rgbColor.ok) { // 'ok' is true when the parsing was a success
    // channels
    console.log(rgbColor.r + ', ' + rgbColor.g + ', ' + rgbColor.b);
    // HEX and RGB
    console.log(rgbColor.toHex());
    console.log(rgbColor.toRGB());
}
```

### License

This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/diegotremper/rgb-color/blob/master/LICENSE.txt) file.
