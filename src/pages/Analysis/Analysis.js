import React, { PureComponent } from 'react';
import styled from 'styled-components';
import idx from 'idx';
import { connect } from 'react-redux';

import { loadPlanningData, setDistrictFilter } from '~/pages/Analysis/AnalysisState';
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

const AnalysisHeader = styled.div`
  text-align: center;
  position: relative;
  padding: 16px 0;
`;

const StyledMenuButton = styled(MenuButton)`
  top: auto;
`;

const districts = [
  'Alle Bezirke anzeigen',
  'Mitte',
  'Friedrichshain-Kreuzberg',
  'Tempelhof-Schöneberg',
  'Treptow-Köpenick',
  'Neukölln',
  'Pankow',
  'Marzahn-Hellersdorf',
  'Spandau',
  'lol'
];

class Analysis extends PureComponent {
  componentDidMount() {
    this.props.loadPlanningData();
  }

  onDistrictChange = (evt) => {
    const districtName = idx(evt, _ => _.target.selectedOptions[0].value);
    this.props.setDistrictFilter(districtName);
  }

  render() {
    const { data, isLoading, selectedDistrict } = this.props;
    const filteredData = selectedDistrict ? data.filter(d => d.planning_sections[0].borough === selectedDistrict) : data;

    return (
      <AnalysisWrapper>
        <AnalysisHeader>
          <StyledMenuButton />
          <BigLabel>Analyse</BigLabel>
        </AnalysisHeader>
        <Card>
          <Select
            title="Wähle einen Bezirk:"
            options={districts}
            onChange={this.onDistrictChange}
            disabled={isLoading}
          />
          <PieChart data={filteredData} isLoading={isLoading} />
        </Card>
        <PlanningList
          data={filteredData}
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
    loadPlanningData: () => dispatch(loadPlanningData()),
    setDistrictFilter: districtName => dispatch(setDistrictFilter(districtName))
  })
)(Analysis);
