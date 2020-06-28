/**
 *
 * typography
 *
 */

// font
export const SYSTEM_FONT =
  'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

export type TypographyFont = 'header' | 'body';
export type TypographyFonts = { [font in TypographyFont]: string };
export const TYPOGRAPHY_FONTS: TypographyFont[] = ['header', 'body'];

// weight
export type TypographyWeight = 'regular' | 'medium' | 'bold';
export type TypographyWeights = { [weight in TypographyWeight]: number };
export const TYPOGRAPHY_WEIGHTS: TypographyWeight[] = ['regular', 'medium', 'bold'];

// size
import { Size, Sizes } from './sizes';

// variant
export type TypographyVariant = (
  size: Size,
  weight?: TypographyWeight, // default: `regular`
  font?: TypographyFont, // default: `body`
) => {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
};

export type Typography = { fonts: TypographyFonts } & {
  weights: TypographyWeights;
} & { variant: TypographyVariant };

export function createTypography(
  sizes: Sizes,
): ({ fonts, weights }: { fonts: TypographyFonts; weights: TypographyWeights }) => Typography {
  return ({ fonts, weights }) => ({
    fonts,
    weights,
    variant: (size, weight = 'regular', font = 'body') => ({
      fontSize: sizes[size],
      fontWeight: weights[weight],
      fontFamily: fonts[font],
    }),
  });
}
