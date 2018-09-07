import React, { PureComponent } from 'react';
import styled from 'styled-components';
import idx from 'idx';
import { connect } from 'react-redux';
import withRouter from 'react-router/withRouter';

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
  'Charlottenburg-Wilmersdorf',
  'Friedrichshain-Kreuzberg',
  'Lichtenberg-Hohenschönhausen',
  'Marzahn-Hellersdorf',
  'Mitte',
  'Neukölln',
  'Pankow',
  'Reinickendorf',
  'Spandau',
  'Steglitz-Zehlendorf',
  'Tempelhof-Schöneberg',
  'Treptow-Köpenick'
];

function filterByDistrict(districtName) {
  return d => d.planning_sections[0].borough.toLowerCase() === districtName.toLowerCase();
}

class Analysis extends PureComponent {
  componentDidMount() {
    const selectedDistrict = idx(this.props, _ => _.match.params.districtName);
    this.props.loadPlanningData(selectedDistrict);
  }

  onDistrictChange = (evt) => {
    const districtName = idx(evt, _ => _.target.selectedOptions[0].value);
    const showAll = districtName.toLowerCase().includes('bezirke');
    const selectedDistrict = showAll ? false : districtName;
    const nextRoute = selectedDistrict ? `/${selectedDistrict}` : '';

    this.props.history.push(`/analyse/planungen${nextRoute}`);
    this.props.setDistrictFilter(selectedDistrict);
  }

  render() {
    const { data, isLoading, selectedDistrict } = this.props;
    const filteredData = selectedDistrict ? data.filter(filterByDistrict(selectedDistrict)) : data;

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
            value={selectedDistrict || 'Alle Bezirke anzeigen'}
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
    loadPlanningData: districtName => dispatch(loadPlanningData(districtName)),
    setDistrictFilter: districtName => dispatch(setDistrictFilter(districtName))
  })
)(Analysis);
