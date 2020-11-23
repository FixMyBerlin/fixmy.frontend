import '~/utils/polyfills';

import React from 'react';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Store from '~/store';

import ResearchPage from '.';

describe('<ArticleHeader>', () => {
  it('renders', () => {
    const history = createMemoryHistory();
    const { getByRole, getAllByRole } = render(
      <Provider store={Store}>
        <IntlProvider defaultLocale="de" locale="de">
          <Router history={history}>
            <ResearchPage />
          </Router>
        </IntlProvider>
      </Provider>
    );
    expect(getByRole('banner')).toBeInTheDocument();
    expect(getAllByRole('button', { name: 'Menü öffnen' })).toHaveLength(1);
    expect(
      getByRole('heading', { name: 'Über das Projekt' })
    ).toBeInTheDocument();

    // Förderlogos
    expect(
      getByRole('img', {
        name:
          'Förderlogo Bundesministerium für Verkehr und digitale Infrastruktur (BMVI)',
      })
    ).toBeInTheDocument();
    expect(
      getByRole('img', {
        name: 'Logo der Senatskanzlei Berlin',
      })
    ).toBeInTheDocument();
  });
});
