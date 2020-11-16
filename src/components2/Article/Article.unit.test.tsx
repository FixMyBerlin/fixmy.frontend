import '~/utils/polyfills';

import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Store from '~/store';

import { Example } from './Article.stories';

describe('<ArticleHeader>', () => {
  it('renders', () => {
    const history = createMemoryHistory();
    const { getByRole, getAllByRole } = render(
      <Provider store={Store}>
        <IntlProvider defaultLocale="de" locale="de">
          <Router history={history}>
            <Example />
          </Router>
        </IntlProvider>
      </Provider>
    );
    expect(getByRole('banner')).toBeInTheDocument();
    expect(getAllByRole('button', { name: 'Menü öffnen' })).toHaveLength(1);
    expect(getAllByRole('heading')).toHaveLength(4);
  });
});
