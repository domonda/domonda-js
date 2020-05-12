export type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla';

export interface ColorObject {
  type: ColorFormat;
  values:
    | [number | string, number | string, number | string]
    | [number | string, number | string, number | string, number | string];
}

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value: number, min = 0, max = 1) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */
export function convertHexToRGB(color: string): string {
  color = color.substr(1);

  const re = new RegExp(`.{1,${color.length / 3}}`, 'g');
  let colors = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }

  return colors ? `rgb(${colors.map((n) => parseInt(n, 16)).join(', ')})` : '';
}

/**
 * Converts a color from CSS rgb format to CSS hex format.
 *
 * @param {string} color - RGB color, i.e. rgb(n, n, n)
 * @returns {string} A CSS rgb color string, i.e. #nnnnnn
 */
export function rgbToHex(color: string): string {
  // Pass hex straight through
  if (color.indexOf('#') === 0) {
    return color;
  }
  function intToHex(c: number | string) {
    const hex = c.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  }

  let { values } = decomposeColor(color);
  values = values.map((n) => intToHex(n)) as any;

  return `#${values.join('')}`;
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {object} - A DUI color object: {type: string, values: number[]}
 */
export function decomposeColor(color: string): ColorObject {
  if (color.charAt(0) === '#') {
    return decomposeColor(convertHexToRGB(color));
  }

  const marker = color.indexOf('(');
  const type: ColorFormat = color.substring(0, marker) as any;
  let values: (string | number)[] = color.substring(marker + 1, color.length - 1).split(',');
  values = values.map((value) => (typeof value === 'string' ? parseFloat(value) : value));

  if (process.env.NODE_ENV !== 'production') {
    if (['rgb', 'rgba', 'hsl', 'hsla'].indexOf(type) === -1) {
      throw new Error(
        [
          `@domonda/ui: unsupported \`${color}\` color.`,
          'We support the following formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla().',
        ].join('\n'),
      );
    }
  }

  return { type, values: (values as any) as ColorObject['values'] };
}

/**
 * Converts a color object with type and values to a string.
 *
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
export function recomposeColor(color: ColorObject): string {
  const { type } = color;
  let { values } = color;

  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    values = values.map((n, i) => (i < 3 ? parseInt(n, 10) : n));
  }

  if (type.indexOf('hsl') !== -1) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }

  return `${color.type}(${values.join(', ')})`;
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */
export function getContrastRatio(foreground: string, background: string): number {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
export function getLuminance(color: string): number {
  const decomposedColor = decomposeColor(color);

  if (decomposedColor.type.indexOf('rgb') !== -1) {
    const rgb = decomposedColor.values.map((val) => {
      if (typeof val === 'string') {
        return 0;
      }
      val /= 255; // normalized
      return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
    });
    // Truncate at 3 digits
    return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
  }

  // else if (decomposedColor.type.indexOf('hsl') !== -1)
  const val = (decomposedColor.values[2] as any) as number;
  return val / 100;
}

/**
 * Darken or lighten a colour, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function emphasize(color: string, coefficient = 0.15): string {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}

/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} value - value to set the alpha channel to in the range 0 -1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function fade(color: string, value: number): string {
  if (!color) return color;

  const colorObject = decomposeColor(color);
  value = clamp(value);

  if (colorObject.type === 'rgb' || colorObject.type === 'hsl') {
    colorObject.type += 'a';
  }
  colorObject.values[3] = value;

  return recomposeColor(colorObject);
}

/**
 * Darkens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function darken(color: string, coefficient: number): string {
  if (!color) return color;

  const colorObject = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (colorObject.type.indexOf('hsl') !== -1) {
    colorObject.values[2] = ((colorObject.values[2] as any) as number) * (1 - coefficient);
  } else if (colorObject.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      colorObject.values[i] = ((colorObject.values[i] as any) as number) * (1 - coefficient);
    }
  }
  return recomposeColor(colorObject);
}

/**
 * Lightens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function lighten(color: string, coefficient: number) {
  if (!color) return color;

  const colorObject = decomposeColor(color);
  coefficient = clamp(coefficient);

  if (colorObject.type.indexOf('hsl') !== -1) {
    colorObject.values[2] =
      ((colorObject.values[2] as any) as number) +
      (100 - ((colorObject.values[2] as any) as number)) * coefficient;
  } else if (colorObject.type.indexOf('rgb') !== -1) {
    for (let i = 0; i < 3; i += 1) {
      colorObject.values[i] =
        ((colorObject.values[i] as any) as number) +
        (255 - ((colorObject.values[i] as any) as number)) * coefficient;
    }
  }

  return recomposeColor(colorObject);
}
