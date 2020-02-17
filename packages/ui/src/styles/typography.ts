/**
 *
 * typography
 *
 */

// font

export const SYSTEM_FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export type TypographyFont = 'header' | 'body';
export type TypographyFonts = { [font in TypographyFont]: string };
export const TYPOGRAPHY_FONTS: TypographyFont[] = ['header', 'body'];

// weight

export type TypographyWeight = 'regular' | 'medium' | 'semiBold';
export type TypographyWeights = { [weight in TypographyWeight]: number };
export const TYPOGRAPHY_WEIGHTS: TypographyWeight[] = ['regular', 'medium', 'semiBold'];

// size

export type TypographySize = 'tiny' | 'small' | 'medium' | 'large';
export type TypographySizes = { [size in TypographySize]: number };
export const TYPOGRAPHY_SIZES: TypographySize[] = ['tiny', 'small', 'medium', 'large'];
export const TYPOGRAPHY_SIZE_PREFIX = 'size-';

// variant

export type TypographyVariant = (
  size: TypographySize,
  weight?: TypographyWeight, // default: `regular`
  font?: TypographyFont, // default: `body`
) => {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
};

export type Typography = { fonts: TypographyFonts } & { sizes: TypographySizes } & {
  weights: TypographyWeights;
} & { variant: TypographyVariant };

export function createTypography({
  fonts,
  weights,
  sizes,
}: {
  fonts: TypographyFonts;
  weights: TypographyWeights;
  sizes: TypographySizes;
}): Typography {
  return {
    fonts,
    sizes,
    weights,
    variant: (size, weight = 'regular', font = 'body') => ({
      fontSize: sizes[size],
      fontWeight: weights[weight],
      fontFamily: fonts[font],
    }),
  };
}
