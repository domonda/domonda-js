import React, { useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Autocomplete } from '../src/Autocomplete';
import { createStyles, withStyles, WithStyles } from '../src/styles';

const stories = storiesOf('Autocomplete', module);

const styles = createStyles(({ spacing, palette, typography, shape }) => ({
  inlineAutocompleteContainer: {
    backgroundColor: palette.gray100,
    width: 256,
    borderRadius: shape.borderRadius.small,
    overflow: 'hidden',
  },
  lightInput: {
    padding: spacing('tiny'),
    color: palette.white,
    fontWeight: typography.weights.semiBold,
    backgroundColor: palette.lighten('gray100', 0.2),
  },
  lightInputEndSvg: {
    bottom: `${spacing('tiny') + 1}px !important`,
    right: `${spacing('tiny')}px !important`,
  },
  lightPaper: {
    border: 0,
    backgroundColor: 'transparent',
  },
  lightMenuItem: {
    color: palette.gray08,
    fontWeight: typography.weights.medium,
    '&:hover': {
      color: palette.white,
      backgroundColor: palette.lighten('gray100', 0.1),
    },
  },
  lightMenuItemSelected: {
    color: palette.white,
    backgroundColor: palette.darken('gray100', 0.4),
  },
  lightMenuItemHighlighted: {
    color: palette.white,
    backgroundColor: palette.lighten('gray100', 0.1),
  },
}));

const Overview: React.FC<WithStyles<typeof styles>> = (props) => {
  const { classes } = props;

  const passwords = useMemo(
    () =>
      Array(1000)
        .fill('')
        .map(() => Math.random().toString(36).substring(8)),
    [],
  );

  const [refinedPasswords, setRefinedPasswords] = useState(passwords);

  return (
    <>
      <div>
        <Autocomplete
          label="Passwords"
          items={refinedPasswords}
          onInputValueChange={(value) => {
            if (value) {
              setRefinedPasswords(passwords.filter((password) => password.includes(value)));
            } else {
              setRefinedPasswords(passwords);
            }
          }}
        />
      </div>
      <br />
      <br />
      <div className={classes.inlineAutocompleteContainer}>
        <Autocomplete
          inlineMenu
          hideClearButton
          items={refinedPasswords}
          placeholder="Type to search..."
          PaperProps={{
            className: classes.lightPaper,
          }}
          MenuItemProps={{
            classes: {
              root: classes.lightMenuItem,
              highlighted: classes.lightMenuItemHighlighted,
              selected: classes.lightMenuItemSelected,
            },
          }}
          InputProps={{
            naked: true,
            classes: { input: classes.lightInput, endSvg: classes.lightInputEndSvg },
            endSvg: (
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="search"
                className="svg-inline--fa fa-search fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M508.5 468.9L387.1 347.5c-2.3-2.3-5.3-3.5-8.5-3.5h-13.2c31.5-36.5 50.6-84 50.6-136C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c52 0 99.5-19.1 136-50.6v13.2c0 3.2 1.3 6.2 3.5 8.5l121.4 121.4c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17zM208 368c-88.4 0-160-71.6-160-160S119.6 48 208 48s160 71.6 160 160-71.6 160-160 160z"
                ></path>
              </svg>
            ),
          }}
          onInputValueChange={(value) => {
            if (value) {
              setRefinedPasswords(passwords.filter((password) => password.includes(value)));
            } else {
              setRefinedPasswords(passwords);
            }
          }}
        />
      </div>
    </>
  );
};

const StyledOverview = withStyles(styles)(Overview);

stories.add('Overview', () => <StyledOverview />);
