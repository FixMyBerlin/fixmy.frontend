import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { loadPlanningData } from '~/pages/Analysis/AnalysisState';
import PieChart from '~/pages/Analysis/components/PieChart';
import BigLabel from '~/components/BigLabel';
import MenuButton from '~/components/MenuButton';
import PlanningList from './components/PlanningList';

const AnalysisWrapper = styled.div`
  background: ${config.colors.lightgrey};
  padding: 8px;
`;

const AnalysisHeader = styled.div`
  text-align: center;
  position: relative;
  padding: 16px 0;
`;

const StyledMenuButton = styled(MenuButton)`
  top: auto;
`;
class Analysis extends PureComponent {
  componentDidMount() {
    this.props.loadPlanningData();
  }

  render() {
    const { data, isLoading } = this.props;
    return (
      <AnalysisWrapper>
        <AnalysisHeader>
          <StyledMenuButton />
          <BigLabel>Analyse</BigLabel>
        </AnalysisHeader>
        <PieChart data={data} isLoading={isLoading} />
        <PlanningList
          data={data}
          isLoading={isLoading}
          sorting={this.props.sorting}
          filter={this.props.filter}
        />
      </AnalysisWrapper>
    );
  }
}

export default connect(
  state => state.AnalysisState,
  dispatch => ({
    loadPlanningData: () => dispatch(loadPlanningData())
  })
)(Analysis);
