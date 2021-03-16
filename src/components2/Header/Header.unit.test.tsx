import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import Store from '~/store';

import Header from './Header';

describe('<Header>', () => {
  it('renders', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Provider store={Store}>
        <IntlProvider defaultLocale="de" locale="de">
          <Router history={history}>
            <Header>Sample page</Header>
          </Router>
        </IntlProvider>
      </Provider>
    );
    expect(getByRole('banner')).toBeInTheDocument();
  });
});
