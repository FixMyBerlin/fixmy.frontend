import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configure, addDecorator } from '@storybook/react';
import { ThemeProvider } from '@material-ui/styles';
import Store from '~/store';
import { getTheme } from '~/styles/mui-utils';
import { IntlProvider } from 'react-intl';

import messages from '~/lang/compiled/de.json';

const StoreDecorator = (storyFn) => (
  <Provider store={Store}>{storyFn()}</Provider>
);

addDecorator(StoreDecorator);

const ThemeDecorator = (storyFn) => {
  const [theme, setTheme] = useState(getTheme('de'));
  return <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>;
};

addDecorator(ThemeDecorator);

const IntlDecorator = (storyFn) => {
  return (
    <IntlProvider locale="de" defaultLocale="de" messages={messages}>
      {storyFn()}
    </IntlProvider>
  );
};

addDecorator(IntlDecorator);

const RouterDecorator = (storyFn) => {
  const history = createMemoryHistory();
  return <Router history={history}>{storyFn()}</Router>;
};

addDecorator(RouterDecorator);
