import React, { useMemo, useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Autocomplete } from '../src/Autocomplete';

const stories = storiesOf('Autocomplete', module);

const Overview: React.FC = () => {
  const passwords = useMemo(
    () =>
      Array(1000)
        .fill('')
        .map(() =>
          Math.random()
            .toString(36)
            .substring(8),
        ),
    [],
  );

  const [refinedPasswords, setRefinedPasswords] = useState(passwords);

  return (
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
  );
};

stories.add('Overview', () => <Overview />);
