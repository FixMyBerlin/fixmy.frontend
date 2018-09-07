import React, { PureComponent } from 'react';
import withRouter from 'react-router/withRouter';
import styled from 'styled-components';

import PlanningListItem from '~/pages/Analysis/components/PlanningListItem';

const PlanningListWrapper = styled.div`
  margin: 1rem 0;
`;

class PlanningList extends PureComponent {
  render() {
    if (this.props.isLoading || this.props.data.length === 0) {
      return null;
    }

    return (
      <PlanningListWrapper>
        {this.props.data.map(d => <PlanningListItem key={d.url} {...d} history={this.props.history} />)}
      </PlanningListWrapper>
    );
  }
}

export default withRouter(PlanningList);
