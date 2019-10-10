import React, { PureComponent, Fragment } from 'react';
import styled from 'styled-components';

import PlanningStatusChart from './PlanningStatusChart';
import PlanningChecklist from './PlanningChecklist';

const DetailButton = styled.button`
  border: 1px solid ${config.colors.interaction};
  font-family: 'Open Sans', sans-serif;
  text-align: center;
  padding: 5px 20px;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
`;

const DetailButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0 10px 0;
  display: none; // for now we dont want to show the details button
`;

class PlanningStatus extends PureComponent {
  state = {
    isExpanded: false
  }

  toggleExpand = () => {
    this.setState(prevState => ({ isExpanded: !prevState.isExpanded }));
  }

  render() {
    return (
      <Fragment>
        <PlanningStatusChart phase={this.props.phase} />
        <DetailButtonWrapper>
          <DetailButton onClick={this.toggleExpand}>Details +</DetailButton>
        </DetailButtonWrapper>
        {this.state.isExpanded ? <PlanningChecklist /> : null}
      </Fragment>
    );
  }
}

export default PlanningStatus;
