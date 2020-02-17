import { styleMap, globalStyle } from '../styles/treat';
import { fade } from '../styles/colorManipulator';
import { COLORS, COLOR_PREFIX, Color } from '../styles/palette';
import { TYPOGRAPHY_SIZES, TYPOGRAPHY_SIZE_PREFIX, TypographySize } from '../styles/typography';

const core = styleMap(({ palette, shadows, shape, transition }) => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'inline-flex',
    overflow: 'visible',
    transition: transition.create(['background-color', 'color']),
    margin: 0,
    outline: 'none',
    border: 0,
    padding: 0,
    width: 'auto',
    background: 'transparent',
    cursor: 'pointer',
    lineHeight: '1em',
    mozOsxFontSmoothing: 'inherit',
    webkitFontSmoothing: 'inherit',
    textAlign: 'inherit',
    textDecoration: 'none',
    webkitAppearance: 'none',
  },
  primary: {
    boxShadow: shadows.line,
    borderRadius: shape.borderRadius.tiny,
  },
  secondary: {
    boxShadow: shadows.line,
    border: `1px solid ${palette.border}`,
    borderRadius: shape.borderRadius.tiny,
    backgroundColor: palette.background,
  },
  text: {},
  link: {
    textDecoration: 'underline',
  },
  disabled: {},
  label: {
    alignItems: 'inherit',
    justifyContent: 'inherit',
    display: 'inherit',
    width: '100%',
    textDecoration: 'inherit',
  },
}));

const colors = styleMap(() => ({
  ...COLORS.reduce(
    (acc, color) => ({
      ...acc,
      [COLOR_PREFIX + color]: {},
    }),
    {},
  ),
}));

const sizes = styleMap(({ typography }) => ({
  ...TYPOGRAPHY_SIZES.reduce(
    (acc, size) => ({
      ...acc,
      [TYPOGRAPHY_SIZE_PREFIX + size]: {
        ...typography.variant(size, 'semiBold'),
      },
    }),
    {},
  ),
}));

export const styles = { ...core, ...colors, ...sizes };

// focus
globalStyle(`${core.root}:focus`, ({ palette }) => ({
  outline: `2px solid ${palette.light('primary')}`,
}));

// active
globalStyle(`${core.root}:active`, () => ({
  outline: 'none',
}));

// primary
globalStyle(`${core.primary}${core.disabled}`, () => ({
  boxShadow: 'none',
  cursor: 'not-allowed',
}));

// secondary
globalStyle(`${core.secondary}:hover, ${core.secondary}:focus`, ({ palette }) => ({
  backgroundColor: palette.darken('background', 0.02),
}));

globalStyle(`${core.secondary}:active`, ({ palette }) => ({
  backgroundColor: palette.darken('background', 0.04),
}));

globalStyle(`${core.secondary}${core.disabled}`, ({ palette }) => ({
  boxShadow: 'none',
  border: `1px solid ${palette.darken('background', 0.2)}`,
  backgroundColor: palette.darken('background', 0.1),
  cursor: 'not-allowed',
}));

// text
globalStyle(`${core.text}:hover, ${core.text}:focus`, () => ({
  textDecoration: 'underline',
}));

globalStyle(`${core.text}${core.disabled}`, () => ({
  cursor: 'not-allowed',
  textDecoration: 'none',
}));

// label
globalStyle(`${core.label} svg`, () => ({
  display: 'inherit',
  fill: 'currentColor',
  color: 'inherit',
}));

// colors
Object.keys(colors).forEach((key) => {
  const className = colors[key as keyof typeof colors];
  const color = key.replace(COLOR_PREFIX, '') as Color;

  globalStyle(`${className}${core.primary}`, ({ palette }) => ({
    border: `1px solid ${palette.dark(color)}`,
    backgroundColor: palette[color],
    color: palette.contrastText(color),
  }));

  globalStyle(`${className}${core.primary}:hover`, ({ palette }) => ({
    backgroundColor: palette.darken(color, 0.05),
  }));

  globalStyle(`${className}${core.primary}:active`, ({ palette }) => ({
    backgroundColor: palette.darken(color, 0.1),
  }));

  globalStyle(
    `${className}${core.primary} > ${core.label} svg:not(:only-child)`,
    ({ palette }) => ({
      color: palette.lighten(color, 0.6),
    }),
  );

  globalStyle(`${className}${core.primary}${core.disabled}`, ({ palette }) => ({
    border: `1px solid ${palette.lighten(color, 0.4)}`,
    backgroundColor: palette.light(color),
    color: fade(palette.contrastText(color), 0.6),
  }));

  globalStyle(`${className}${core.secondary}`, ({ palette }) => ({
    color: palette[color],
  }));

  globalStyle(
    `${className}${core.secondary} > ${styles.label} svg:not(:only-child)`,
    ({ palette }) => ({
      color: palette.fade(color, 0.6),
    }),
  );

  globalStyle(`${className}${core.secondary}${core.disabled}`, ({ palette }) => ({
    color: palette.fade(color, 0.4),
  }));

  globalStyle(
    `${className}${core.secondary}${core.disabled}  > ${core.label} svg:not(:only-child)`,
    ({ palette }) => ({
      color: palette.fade(color, 0.2),
    }),
  );

  globalStyle(`${className}${core.text}`, ({ palette }) => ({
    color: palette[color],
  }));

  globalStyle(`${className}${core.text}:hover`, ({ palette }) => ({
    color: palette.darken(color, 0.05),
  }));

  globalStyle(`${className}${core.text}:active`, ({ palette }) => ({
    color: palette.darken(color, 0.1),
  }));

  globalStyle(`${className}${core.text} > ${core.label} svg:not(:only-child)`, ({ palette }) => ({
    color: palette.fade(color, 0.6),
  }));

  globalStyle(`${className}${core.text}${core.disabled}`, ({ palette }) => ({
    color: palette.fade(color, 0.4),
  }));

  globalStyle(
    `${className}${core.text}${core.disabled} > ${core.label} svg:not(:only-child)`,
    ({ palette }) => ({
      color: palette.fade(color, 0.2),
    }),
  );

  globalStyle(`${className}${core.link}`, ({ palette }) => ({
    color: palette[color],
  }));

  globalStyle(`${className}${core.link}:hover`, ({ palette }) => ({
    color: palette.darken(color, 0.05),
  }));

  globalStyle(`${className}${core.link}:active`, ({ palette }) => ({
    color: palette.darken(color, 0.1),
  }));

  globalStyle(`${className}${core.link} > ${core.label} svg:not(:only-child)`, ({ palette }) => ({
    color: palette.fade(color, 0.6),
  }));

  globalStyle(`${className}${core.link}${core.disabled}`, ({ palette }) => ({
    color: palette.fade(color, 0.4),
  }));

  globalStyle(
    `${className}${core.link}${core.disabled} > ${core.label} svg:not(:only-child)`,
    ({ palette }) => ({
      color: palette.fade(color, 0.2),
    }),
  );
});

// sizes
Object.keys(sizes).forEach((key) => {
  const className = sizes[key as keyof typeof sizes];
  const size = key.replace(TYPOGRAPHY_SIZE_PREFIX, '') as TypographySize;

  globalStyle(`${className} > ${core.label} svg`, ({ typography }) => ({
    height: typography.sizes[size],
  }));

  globalStyle(`${className}${core.primary}, ${className}${core.secondary}`, ({ typography }) => ({
    padding: `${typography.sizes[size] / 2}px` + ' ' + `${typography.sizes[size]}px`,
  }));

  globalStyle(
    `${className}${core.primary} > ${core.label} svg:not(:only-child):first-child, ${className}${core.secondary} > ${core.label} svg:not(:only-child):first-child`,
    ({ typography }) => ({
      marginRight: typography.sizes[size],
    }),
  );

  globalStyle(
    `${className}${core.primary} > ${core.label} svg:not(:only-child):last-child, ${className}${core.secondary} > ${core.label} svg:not(:only-child):last-child`,
    ({ typography }) => ({
      marginLeft: typography.sizes[size],
    }),
  );

  globalStyle(
    `${className}${core.text} > ${core.label} svg:not(:only-child):first-child, ${className}${core.link} > ${core.label} svg:not(:only-child):first-child`,
    ({ typography }) => ({
      marginRight: `calc(${typography.sizes.tiny}px / 2)`,
    }),
  );

  globalStyle(
    `${className}${core.text} > ${core.label} svg:not(:only-child):last-child, ${className}${core.link} > ${core.label} svg:not(:only-child):last-child`,
    ({ typography }) => ({
      marginLeft: `calc(${typography.sizes.tiny}px / 2)`,
    }),
  );
});
