# rgb-color

[![Greenkeeper badge](https://badges.greenkeeper.io/diegotremper/rgb-color.svg)](https://greenkeeper.io/)
[![NPM version](https://img.shields.io/npm/v/rgb-color.svg?style=flat-square)](https://www.npmjs.com/package/rgb-color)
[![NPM downloads](http://img.shields.io/npm/dm/rgb-color.svg?style=flat-square)](https://www.npmjs.com/package/rgb-color)
[![Build Status](http://img.shields.io/travis/diegotremper/rgb-color/master.svg?style=flat-square)](https://travis-ci.org/diegotremper/rgb-color)
[![Coverage Status](https://img.shields.io/coveralls/diegotremper/rgb-color.svg?style=flat-square)](https://coveralls.io/github/diegotremper/rgb-color)
[![Dependency Status](http://img.shields.io/david/diegotremper/rgb-color.svg?style=flat-square)](https://david-dm.org/diegotremper/rgb-color#info=dependencies)
[![Dev Dependency Status](https://img.shields.io/david/dev/diegotremper/rgb-color.svg?style=flat-square)](https://david-dm.org/diegotremper/rgb-color#info=dev)
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

### License

This source code is licensed under the MIT license found in
the [LICENSE.txt](https://github.com/diegotremper/rgb-color/blob/master/LICENSE.txt) file.
