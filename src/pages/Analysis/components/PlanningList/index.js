import React, { PureComponent } from 'react';
import styled from 'styled-components';

import PlanningListItem from '~/pages/Analysis/components/PlanningListItem';

const PlanningListWrapper = styled.div`
  margin: 1rem auto;
  max-width: 650px;
`;

const Sorter = styled.div``;

class PlanningList extends PureComponent {
  render() {
    if (this.props.isLoading) {
      return null;
    }

    return (
      <PlanningListWrapper>
        <Sorter>Sortieren:</Sorter>
        {this.props.data.map(d => <PlanningListItem key={d.url} {...d} />)}
      </PlanningListWrapper>
    );
  }
}

export default PlanningList;
