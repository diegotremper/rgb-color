import namedColors from './named-colors';
import colorDefs from './color-defs';

/**
 * RGBColor
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
class RGBColor {
  constructor(color) {
    let colorString = color;
    this.ok = false;

    // just accept strings
    if (!(typeof colorString === 'string')) {
      return;
    }

    // strip any leading #
    if (colorString.charAt(0) === '#') { // remove # if any
      colorString = colorString.substr(1, 6);
    }

    colorString = colorString.replace(/ /g, '').toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    if (Object.prototype.hasOwnProperty.call(namedColors, colorString)) {
      colorString = namedColors[colorString];
    }
    // emd of simple type-in colors

    // search through the definitions to find a match
    for (let i = 0; i < colorDefs.length; i += 1) {
      const re = colorDefs[i].re;
      const processor = colorDefs[i].process;
      const bits = re.exec(colorString);
      if (bits) {
        const channels = processor(bits);
        this.r = channels[0];
        this.g = channels[1];
        this.b = channels[2];
        this.ok = true;
      }
    }

    // validate/cleanup values
    if (this.r < 0 || isNaN(this.r)) {
      this.r = 0;
    } else if (this.r > 255) {
      this.r = 255;
    }

    if (this.g < 0 || isNaN(this.g)) {
      this.g = 0;
    } else if (this.g > 255) {
      this.g = 255;
    }
    if (this.b < 0 || isNaN(this.b)) {
      this.b = 0;
    } else if (this.b > 255) {
      this.b = 255;
    }
  }

  isValid() {
    return this.ok;
  }

  rgb() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  hex() {
    let r = this.r.toString(16);
    let g = this.g.toString(16);
    let b = this.b.toString(16);
    if (r.length === 1) r = `0${r}`;
    if (g.length === 1) g = `0${g}`;
    if (b.length === 1) b = `0${b}`;
    return `#${r}${g}${b}`;
  }

  channels() {
    return { r: this.r, g: this.g, b: this.b };
  }
}

export default function rgbcolor(color) {
  return new RGBColor(color);
}
