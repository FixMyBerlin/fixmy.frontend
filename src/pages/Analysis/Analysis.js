import React, { PureComponent } from 'react';
import styled from 'styled-components';
import idx from 'idx';
import { connect } from 'react-redux';

import { districts } from '~/labels';
import { loadPlanningData, setDistrictFilter, setPhaseFilter } from '~/pages/Analysis/AnalysisState';
import PieChart from '~/pages/Analysis/components/PieChart';
import BigLabel from '~/components/BigLabel';
import MenuButton from '~/components/MenuButton';
import Select from '~/components/Select';
import PlanningList from './components/PlanningList';
import Card from './components/Card';

const AnalysisWrapper = styled.div`
  background: ${config.colors.lightgrey};
  padding: 8px;
  height: 100%;
  overflow-y: scroll;
`;

const AnalysisContent = styled.div`
  max-width: 650px;
  margin: 0 auto;
`;

const AnalysisHeader = styled.div`
  text-align: center;
  position: relative;
  padding: 16px 0;
`;

const AnalysisControls = styled.div`
  margin: 16px 0;
  display: ${props => (props.isVisible ? 'block' : 'none')};
`;

const StyledMenuButton = styled(MenuButton)`
  top: auto;
`;

const districtOptions = [
  { label: 'Alle Bezirke anzeigen', value: 'all' },
  ...districts.map(districtName =>
    ({ label: districtName, value: districtName.toLowerCase() })
  )
];

const phaseOptions = [
  { label: 'Alle Phasen anzeigen', value: 'all' },
  ...config.planningPhases.map(phase =>
    ({ label: phase.name, value: phase.id })
  )
];

function filter(districtName, phaseName) {
  return (d) => {
    const districtVisible = !districtName ? true : d.planning_sections[0].borough.toLowerCase() === districtName.toLowerCase();
    const phaseVisible = !phaseName ? true : d.phase === phaseName.toLowerCase();

    return districtVisible && phaseVisible;
  };
}

class Analysis extends PureComponent {
  componentDidMount() {
    const selectedDistrict = idx(this.props, _ => _.match.params.districtName);
    this.props.loadPlanningData(selectedDistrict);
  }

  onDistrictChange = (evt) => {
    const districtName = idx(evt, _ => _.target.selectedOptions[0].value);
    const showAll = districtName === 'all';
    const selectedDistrict = showAll ? false : districtName;
    const nextRoute = selectedDistrict ? `/${selectedDistrict}` : '';

    this.props.history.push(`/analyse/planungen${nextRoute}`);
    this.props.setDistrictFilter(selectedDistrict);
  }

  onPhaseFilterChange = (evt) => {
    const phaseValue = idx(evt, _ => _.target.selectedOptions[0].value);
    const showAll = phaseValue === 'all';
    const selectedPhase = showAll ? false : phaseValue;
    this.props.setPhaseFilter(selectedPhase);
  }

  render() {
    const { data, isLoading, selectedDistrict, selectedPhase } = this.props;
    const filteredData = data.filter(filter(selectedDistrict, selectedPhase));
    const hasData = filteredData.length > 0;

    return (
      <AnalysisWrapper>
        <AnalysisContent>
          <AnalysisHeader>
            <StyledMenuButton />
            <BigLabel>Analyse</BigLabel>
          </AnalysisHeader>
          <Card>
            <Select
              title="Wähle einen Bezirk:"
              options={districtOptions}
              onChange={this.onDistrictChange}
              disabled={isLoading}
              value={selectedDistrict || 'all'}
              isVisible={!isLoading}
            />
            <PieChart data={filteredData} isLoading={isLoading} />
          </Card>

          <AnalysisControls isVisible={!isLoading && hasData}>
            <Select
              title="Phase filtern:"
              options={phaseOptions}
              onChange={this.onPhaseFilterChange}
              disabled={isLoading}
              value={selectedPhase || 'all'}
            />
          </AnalysisControls>

          <PlanningList
            data={filteredData}
            isLoading={isLoading}
            sorting={this.props.sorting}
            filter={this.props.filter}
          />
        </AnalysisContent>
      </AnalysisWrapper>
    );
  }
}

export default connect(
  state => state.AnalysisState,
  dispatch => ({
    loadPlanningData: districtName => dispatch(loadPlanningData(districtName)),
    setDistrictFilter: districtName => dispatch(setDistrictFilter(districtName)),
    setPhaseFilter: districtName => dispatch(setPhaseFilter(districtName))
  })
)(Analysis);
