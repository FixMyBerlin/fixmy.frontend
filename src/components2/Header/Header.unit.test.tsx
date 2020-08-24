import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Header from './Header';
import Store from '~/store';

describe('<Header>', () => {
  it('renders', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Provider store={Store}>
        <Router history={history}>
          <Header>Sample page</Header>
        </Router>
      </Provider>
    );
    expect(getByRole('banner')).toBeInTheDocument();
  });
});
