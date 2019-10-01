import { CSSProperties } from './createStyles';

export type TypographyFont = 'header' | 'body';
export type TypographyFonts = { [font in TypographyFont]: string };
export const TYPOGRAPHY_FONTS: TypographyFont[] = ['header', 'body'];
export const defaultFonts: TypographyFonts = {
  header: 'Roboto Mono, monospace',
  body: 'Open Sans, sans-serif',
};

export type TypographyWeight = 'bold' | 'semiBold' | 'medium' | 'regular' | 'light';
export type TypographyWeights = { [weight in TypographyWeight]: number };
export const TYPOGRAPHY_WEIGHTS: TypographyWeight[] = [
  'bold',
  'semiBold',
  'medium',
  'regular',
  'light',
];
export const defaultFontWeights: TypographyWeights = {
  bold: 700,
  semiBold: 600,
  medium: 500,
  regular: 400,
  light: 300,
};

export type TypographyVariant =
  | 'headline'
  | 'subheading'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'caption'
  | 'label';
export type TypographyVariants = {
  [variant in TypographyVariant]: {
    fontFamily: string;
    fontSize: number | string;
    fontWeight: number;
    textTransform: CSSProperties['textTransform'] | undefined;
  };
};
export const TYPOGRAPHY_VARIANTS: TypographyVariant[] = [
  'headline',
  'subheading',
  'title',
  'subtitle',
  'body',
  'caption',
  'label',
];

export type Typography = { fonts: TypographyFonts } & {
  weights: TypographyWeights;
} & TypographyVariants;

export const defaultTypography: Typography = {
  fonts: defaultFonts,
  weights: defaultFontWeights,
  headline: {
    fontFamily: defaultFonts.header,
    fontSize: 28,
    fontWeight: defaultFontWeights.bold,
    textTransform: undefined,
  },
  subheading: {
    fontFamily: defaultFonts.header,
    fontSize: 24,
    fontWeight: defaultFontWeights.regular,
    textTransform: undefined,
  },
  title: {
    fontFamily: defaultFonts.header,
    fontSize: 20,
    fontWeight: defaultFontWeights.bold,
    textTransform: undefined,
  },
  subtitle: {
    fontFamily: defaultFonts.body,
    fontSize: 18,
    fontWeight: defaultFontWeights.semiBold,
    textTransform: undefined,
  },
  body: {
    fontFamily: defaultFonts.body,
    fontSize: 15,
    fontWeight: defaultFontWeights.regular,
    textTransform: undefined,
  },
  caption: {
    fontFamily: defaultFonts.body,
    fontSize: 11,
    fontWeight: defaultFontWeights.regular,
    textTransform: undefined,
  },
  label: {
    fontFamily: defaultFonts.body,
    fontSize: '.75rem',
    fontWeight: defaultFontWeights.semiBold,
    textTransform: 'uppercase',
  },
};
