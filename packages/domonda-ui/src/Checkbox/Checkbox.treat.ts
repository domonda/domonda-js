import { styleMap, globalStyle } from '../styles/treat';
import { COLORS, COLOR_PREFIX, Color } from '../styles/palette';
import { TYPOGRAPHY_SIZES, TYPOGRAPHY_SIZE_PREFIX, TypographySize } from '../styles/typography';

const core = styleMap(({ spacing, transition }) => ({
  root: {
    position: 'relative',
    alignItems: 'center',
    display: 'inline-flex',
    transition: transition.create(['color']),
    cursor: 'pointer',
  },
  unchecked: {
    alignItems: 'flex-start',
    display: 'flex',
    color: 'inherit',
  },
  checked: {
    alignItems: 'flex-start',
    display: 'flex',
    color: 'inherit',
  },
  disabled: {},
  label: {
    marginLeft: spacing('tiny'),
    fontSize: 'inherit',
    color: 'inherit',
  },
}));

const colors = styleMap(({ palette }) => ({
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [COLOR_PREFIX + color]: {
        color: palette[color],
      },
    }),
    {},
  ),
}));

const sizes = styleMap(({ typography }) => ({
  ...TYPOGRAPHY_SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [TYPOGRAPHY_SIZE_PREFIX + size]: {
        fontSize: typography.sizes[size],
      },
    }),
    {},
  ),
}));

export const styles = { ...core, ...colors, ...sizes };

globalStyle(`${core.root} > input`, () => ({
  position: 'absolute',
  opacity: 0,
  margin: 0,
  padding: 0,
  cursor: 'pointer',
}));

globalStyle(`${core.root} > input:checked ~ ${core.unchecked}`, () => ({
  display: 'none',
}));

globalStyle(`${core.root} > input:not(:checked) ~ ${core.checked}`, () => ({
  display: 'none',
}));

// disabled
globalStyle(`${core.root}${core.disabled}`, () => ({
  cursor: 'not-allowed',
}));

globalStyle(`${core.root}${core.disabled} > input`, () => ({
  cursor: 'not-allowed',
}));

// colors
Object.keys(colors).forEach((key) => {
  const className = colors[key as keyof typeof colors];
  const color = key.replace(COLOR_PREFIX, '') as Color;

  globalStyle(`${className}${core.disabled}`, ({ palette }) => ({
    color: palette.fade(color, 0.4),
  }));

  globalStyle(`${className}:not(${core.disabled}):hover`, ({ palette }) => ({
    color: palette.dark(color),
  }));

  globalStyle(
    `${className}:not(${core.disabled}) > input:focus ~ ${core.unchecked}, ${className} > input:focus ~ ${core.checked}`,
    ({ palette }) => ({
      outline: `2px solid ${palette.light('primary')}`,
      color: palette.dark(color),
    }),
  );

  globalStyle(
    `${className}:not(${core.disabled}) > input:focus ~ ${core.label}`,
    ({ palette }) => ({
      color: palette.dark(color),
    }),
  );
});

// sizes
Object.keys(sizes).forEach((key) => {
  const className = sizes[key as keyof typeof sizes];
  const size = key.replace(TYPOGRAPHY_SIZE_PREFIX, '') as TypographySize;

  globalStyle(`${className} > input`, ({ typography }) => ({
    width: typography.sizes[size],
    height: typography.sizes[size],
  }));

  globalStyle(
    `${className} > ${core.unchecked} > svg, ${className} > ${core.checked} > svg`,
    ({ typography }) => ({
      width: typography.sizes[size],
    }),
  );
});
