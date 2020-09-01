import React from 'react';

import '~/utils/polyfills';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { Router } from 'react-router-dom';

import Store from '~/store';
import messages from '~/lang/compiled/de.json';
import polyfill from './polyfill-intl';

/**
 * Takes an actionType stated as path (e.g. Reports/SubmitReportsState/VALIDATE_POSITION)
 * and returns the last path element (in case of the example VALIDATE_POSITION).
 * Used to keep the test runner console output short when types are passed to the test description statement
 * by reference (actions.someAction).
 * @param {String} pathedAction
 * @returns {String} {any}
 */
export const formatActionType = (pathedAction: string): string =>
  pathedAction.split('/').pop();

const Providers = ({ children }) => {
  const history = createMemoryHistory();
  polyfill('en');
  return (
    <Provider store={Store}>
      <IntlProvider defaultLocale="en" locale="en" messages={messages}>
        <Router history={history}>{children}</Router>
      </IntlProvider>
    </Provider>
  );
};

export const customRender = (
  ui: Parameters<typeof render>[0],
  options: Parameters<typeof render>[1] = {}
) => render(ui, { wrapper: Providers, ...options });

export { customRender as render };
