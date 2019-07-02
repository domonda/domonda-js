import { Color, makeCreateStyles, withStyles, WithStyles } from '../styles';
import { TextProps } from './Text';

const styles = makeCreateStyles<TextProps>()((theme) => ({
  root: {
    margin: 0,
    color: theme.palette.textPrimary,
  },
  block: {
    display: 'block',
  },
  inline: {
    display: 'inline',
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  color: ({ color = 'textPrimary', colorVariant }) => {
    const manipulator = colorVariant
      ? theme.palette[colorVariant]
      : (color: Color) => theme.palette[color];
    return {
      color: color === 'inherit' ? 'inherit' : manipulator(color),
    };
  },
  variant: ({ variant = 'body' }) => ({ ...theme.typography[variant] }),
  weight: ({ weight }) => ({ fontWeight: weight ? theme.typography.weights[weight] : undefined }),
  font: ({ font }) => ({ fontFamily: font ? theme.typography.fonts[font] : undefined }),
}));

export type Decorate = WithStyles<typeof styles>;

export const decorate = withStyles(styles);
