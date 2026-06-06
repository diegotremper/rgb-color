# rgb-color

[![NPM version](https://img.shields.io/npm/v/rgb-color.svg?style=flat-square)](https://www.npmjs.com/package/rgb-color)
[![NPM downloads](http://img.shields.io/npm/dm/rgb-color.svg?style=flat-square)](https://www.npmjs.com/package/rgb-color)
[![CI](https://img.shields.io/github/actions/workflow/status/diegotremper/rgb-color/ci.yml?branch=master&style=flat-square)](https://github.com/diegotremper/rgb-color/actions/workflows/ci.yml)
[![Online Chat](https://img.shields.io/badge/chat_room-%23rgb-color.svg?style=flat-square)](https://gitter.im/rgb-color)

> A JavaScript class that accepts a string and tries to figure out a valid color out of it. Thanks to Stoyan Stefanov: http://www.phpied.com/rgb-color-parser-in-javascript/

### Installation

```sh
$ npm install rgb-color
```

### How to use

#### General
```javascript
var color = rgbcolor('darkblue');
if (color.isValid()) { // 'isValid()' is true when the parsing was a success
    // channels
    var obj = color.channels();
    console.log(obj.r + ', ' + obj.g + ', ' + obj.b);
    // log: { r: 0, g: 0, b: 139 }
    // HEX
    console.log(color.hex());
    // log: #00008b
    // RGB
    console.log(color.rgb());
    // log: rgb(0, 0, 139)
}
```

#### Nodejs
```javascript
var rgbcolor = require('rgb-color');
var color = rgbcolor('darkblue');

if (color.isValid()) { // 'isValid()' is true when the parsing was a success
    // channels
    var obj = color.channels();
    console.log(obj.r + ', ' + obj.g + ', ' + obj.b);
    // log: { r: 0, g: 0, b: 139 }
    // HEX
    console.log(color.hex());
    // log: #00008b
    // RGB
    console.log(color.rgb());
    // log: rgb(0, 0, 139)
}
```

### Demo

&nbsp; &nbsp; Demo at Codepen: [Demo](https://codepen.io/diegotremper/pen/GEZxMp?editors=0010)
 
### Features

&nbsp; &nbsp; ✓ Cross-platform, no dependencies<br>
&nbsp; &nbsp; ✓ Exported in [UMD](https://github.com/umdjs/umd) (Universal Module Definition)<br>

### Development

```sh
$ npm install
$ npm test
$ npm run lint
```

Development requires Node.js 20.19 or newer. The published package has no runtime dependencies.

### License

This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/diegotremper/rgb-color/blob/master/LICENSE.txt) file.
