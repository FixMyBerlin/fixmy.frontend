import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { loadPlanningData } from '~/pages/Analysis/AnalysisState';
import Card from '~/pages/Analysis/components/Card';
import PieChart from '~/pages/Analysis/components/PieChart';
import PlanningList from './components/PlanningList';

const AnalysisWrapper = styled.div`
  background: ${config.colors.lightgrey};
  padding: 8px;
`;

class Analysis extends PureComponent {
  componentDidMount() {
    this.props.loadPlanningData();
  }

  render() {
    const { data, isLoading } = this.props;
    return (
      <AnalysisWrapper>
        <Card>
          <PieChart data={data} isLoading={isLoading} />
        </Card>
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
