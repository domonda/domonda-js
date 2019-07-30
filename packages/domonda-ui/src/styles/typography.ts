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
  | 'caption';
export type TypographyVariants = {
  [variant in TypographyVariant]: {
    fontFamily: string;
    fontSize: number;
    fontWeight: number;
  };
};
export const TYPOGRAPHY_VARIANTS: TypographyVariant[] = [
  'headline',
  'subheading',
  'title',
  'subtitle',
  'body',
  'caption',
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
  },
  subheading: {
    fontFamily: defaultFonts.header,
    fontSize: 24,
    fontWeight: defaultFontWeights.regular,
  },
  title: {
    fontFamily: defaultFonts.header,
    fontSize: 20,
    fontWeight: defaultFontWeights.bold,
  },
  subtitle: {
    fontFamily: defaultFonts.body,
    fontSize: 18,
    fontWeight: defaultFontWeights.semiBold,
  },
  body: {
    fontFamily: defaultFonts.body,
    fontSize: 15,
    fontWeight: defaultFontWeights.regular,
  },
  caption: {
    fontFamily: defaultFonts.body,
    fontSize: 11,
    fontWeight: defaultFontWeights.regular,
  },
};
