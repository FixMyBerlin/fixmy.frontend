import '~/utils/polyfills';

import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Store from '~/store';

import { getReportStatusCaption } from '~/pages/Reports/apiservice';

import ProjectList from '..';
import projectListFixture from './projectlist.fixture.json';
import reportListFixture from './reportList.fixture.json';

describe('Project list component', () => {
  it('renders in loading state', () => {
    const history = createMemoryHistory();
    const { getByRole } = render(
      <Provider store={Store}>
        <Router history={history}>
          <ProjectList isLoading data={[]} />
        </Router>
      </Provider>
    );
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders when nothing has been liked', () => {
    const history = createMemoryHistory();
    const { queryAllByTestId, getByText } = render(
      <Provider store={Store}>
        <Router history={history}>
          <ProjectList isLoading={false} data={[]} />
        </Router>
      </Provider>
    );
    expect(queryAllByTestId('project-list-item')).toHaveLength(0);
    expect(
      getByText('Du hast noch keine Planungen geliked.')
    ).toBeInTheDocument();
  });

  it('renders project list', () => {
    const history = createMemoryHistory();
    const { getAllByTestId, getByText } = render(
      <Provider store={Store}>
        <Router history={history}>
          <ProjectList isLoading={false} data={projectListFixture} />
        </Router>
      </Provider>
    );
    expect(getAllByTestId('project-list-item')).toHaveLength(2);
    expect(getByText(projectListFixture[0].street_name)).toBeInTheDocument();
    expect(getByText(projectListFixture[0].title)).toBeInTheDocument();
  });

  it('renders report list', () => {
    const history = createMemoryHistory();
    const { getAllByTestId, getByText } = render(
      <Provider store={Store}>
        <Router history={history}>
          <ProjectList
            isLoading={false}
            itemType="reports"
            data={reportListFixture}
          />
        </Router>
      </Provider>
    );
    expect(getAllByTestId('report-list-item')).toHaveLength(2);
    expect(getByText(reportListFixture[0].address)).toBeInTheDocument();
    expect(
      getByText(
        `Status: ${getReportStatusCaption(reportListFixture[0].status)}`
      )
    ).toBeInTheDocument();
  });
});
