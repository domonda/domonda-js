import { style, styleMap, globalStyle, Style } from 'treat';
import { COLORS } from '../styles/palette';
import { root as rootSvg } from '../Svg/Svg.treat';
import { SIZES, Size } from '../styles/sizes';

export const root = style(({ transition, sizing }) => ({
  position: 'relative',
  display: 'inline-flex',
  transition: transition.create(['color']),
  alignItems: 'center',
  cursor: 'pointer',
  padding: sizing('tiny'),
}));

export const input = style({
  position: 'absolute',
  opacity: 0,
  padding: 0,
  margin: 0,
  outline: 0,
  cursor: 'pointer',
});

export const checked = style(() => ({}));

export const controlled = style(() => ({}));

export const uncheckedIcon = style(() => ({
  alignItems: 'flex-start',
  display: 'flex',
  color: 'inherit',
  selectors: {
    [`${input}:not(${controlled}):checked ~ &, ${controlled}${checked} ~ &`]: {
      display: 'none',
    },
  },
}));

export const checkedIcon = style(() => ({
  alignItems: 'flex-start',
  display: 'flex',
  color: 'inherit',
  selectors: {
    [`${input}:not(${controlled}):not(:checked) ~ &, ${controlled}:not(${checked}) ~ &`]: {
      display: 'none',
    },
  },
}));

export const label = style(({ sizing, typography }) => ({
  marginLeft: sizing('small'),
  fontFamily: typography.fonts.body,
}));

export const focused = style(({ palette }) => ({
  outline: `${palette.focus} auto 5px`,
}));

export const disabled = style(() => ({
  selectors: {
    [`${root}&, ${input}&, ${checkedIcon}&, ${uncheckedIcon}&`]: {
      cursor: 'not-allowed',
    },
  },
}));

export const wrap = styleMap(() => ({
  wrap: {},
  hover: {
    selectors: {
      [`${root}&`]: {
        maxWidth: '100%',
      },
      [`${label}&`]: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      [`${label}&:hover`]: {
        whiteSpace: 'pre-wrap',
      },
    },
  },
  nowrap: {
    selectors: {
      [`${root}&`]: {
        maxWidth: '100%',
      },
      [`${label}&`]: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },
}));

export const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce<Record<string, Style>>(
    (acc, color) => ({
      ...acc,
      [color]: {
        selectors: {
          [`${root}&`]: {
            color: palette[color],
          },
          [`&:not(${disabled}):hover`]: {
            color: palette.dark(color),
          },
          [`${disabled}&`]: {
            color: palette.fade(color, 0.4),
          },
        },
      },
    }),
    {},
  ),
}));

export const sizes = styleMap(({ sizing }) => ({
  ...SIZES.reduce<Record<string, Style>>(
    (acc, size) => ({
      ...acc,
      [size]: {
        fontSize: sizing(size),
        selectors: {
          [`${uncheckedIcon}&`]: {
            height: sizing(size),
          },
          [`${checkedIcon}&`]: {
            height: sizing(size),
          },
        },
      },
    }),
    {},
  ),
}));

// sizes
Object.keys(sizes).forEach((key) => {
  const className = sizes[key as keyof typeof sizes];
  const size = key as Size;

  globalStyle(`${className} > ${input}`, ({ sizing }) => ({
    width: sizing(size),
    height: sizing(size),
  }));

  globalStyle(
    `${className} > ${uncheckedIcon} > ${rootSvg}, ${className} > ${checkedIcon} > ${rootSvg}`,
    ({ sizing }) => ({
      height: sizing(size),
    }),
  );
});
