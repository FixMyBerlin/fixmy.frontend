import React, { useState } from 'react';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from '@material-ui/styles';
import Store from '~/store';
import { getTheme } from '~/styles/mui-utils';

const StoreDecorator = (storyFn) => (
  <Provider store={Store}>{storyFn()}</Provider>
);

addDecorator(StoreDecorator);

const ThemeDecorator = (storyFn) => {
  const [theme, setTheme] = useState(getTheme('de'));
  return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
};

addDecorator(ThemeDecorator);
