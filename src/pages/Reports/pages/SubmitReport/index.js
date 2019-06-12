import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import history from '~/history';
import Markdown from '~/pages/Markdown/Markdown';
import SubmitReportDialog from './components/SubmitReportDialog';

const SubmitReportWrapper = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
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
