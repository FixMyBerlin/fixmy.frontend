import React, { PureComponent } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import styled from 'styled-components';

import history from '~/history';

import SubmitReportDialog from './ReportDialog';

const Markdown = React.lazy(() => import('~/pages/Markdown'));

const SubmitReportWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

class SubmitReport extends PureComponent {
  render() {
    const { match } = this.props;

    return (
      <SubmitReportWrapper>
        <Router history={history}>
          <Switch>
            <Route
              path={`${match.path}/:step`}
              component={SubmitReportDialog}
            />
            <Redirect to={`${match.path}/1`} />
            <Route render={() => <Markdown page="nomatch" />} />
          </Switch>
        </Router>
      </SubmitReportWrapper>
    );
  }
}

export default SubmitReport;
