import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';

import config from '~/config';
import { sortByKey } from '~/utils/utils';
import { districts } from '~/labels';
import {
  loadProjectData,
  setDistrictFilter,
  setPhaseFilter,
  setSort,
} from '~/apps/Analysis/AnalysisState';
import PieChart from '~/apps/Analysis/components/PieChart';
import Title from '~/components/Title';
import MenuButton from '~/components/MenuButton';
import Flex from '~/components/Flex';
import Select from '~/components/Select';
import ProjectList from '~/components2/ProjectList';
import Card from './components/Card';
import logger from '~/utils/logger';
import { PLANNING_PHASES } from '~/apps/Map/constants';
import { RootState } from '~/store';

const AnalysisWrapper = styled.div`
  background: ${config.colors.lightgrey};
  padding: 8px;
  height: 100%;
  overflow-y: scroll;
`;

const StyledSelect = styled(Select)`
  max-width: 50%;
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

const AnalysisControls = styled.div<{ isVisible: boolean }>`
  margin: 16px 0;
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  justify-content: space-between;
`;

const StyledMenuButton = styled(MenuButton)`
  top: auto;
`;

const districtOptions = [
  { label: 'Alle Bezirke anzeigen', value: 'all' },
  ...districts.map((districtName) => ({
    label: districtName,
    value: districtName.toLowerCase(),
  })),
];

const phaseOptions = [
  { label: 'Alle Phasen anzeigen', value: 'all' },
  ...PLANNING_PHASES.map((phase) => ({
    label: phase.name,
    value: phase.id,
  })),
];

const sortOptions = [
  { value: 'likes', label: 'Likes', sortDirection: 'DESC' },
  { value: 'length', label: 'Länge', sortDirection: 'DESC' },
  {
    value: 'construction_completed_date',
    label: 'Fertigstellung',
    sortDirection: 'ASC',
  },
];

interface District {
  borough: string;
  phase: string;
}

function filterDistrict(districtName: string) {
  return (d: District) => {
    if (!districtName) return true;
    if (d.borough == null) logger('No borough defined', d);
    return d.borough?.toLowerCase() === districtName.toLowerCase();
  };
}

function filterPhase(phaseName) {
  return (d: District) =>
    !phaseName ? true : d.phase === phaseName.toLowerCase();
}

const connector = connect(
  (state: RootState) => state.AnalysisState,
  (dispatch) => ({
    loadProjectData: (districtName: string) =>
      dispatch<any>(loadProjectData(districtName)),
    setDistrictFilter: (districtName: string) =>
      dispatch(setDistrictFilter(districtName)),
    setPhaseFilter: (districtName: string) =>
      dispatch(setPhaseFilter(districtName)),
    setSort: (sort: string) => dispatch(setSort(sort)),
  })
);

type Props = ConnectedProps<typeof connector> &
  RouteComponentProps<{ districtName?: string }>;

class Analysis extends PureComponent<Props> {
  componentDidMount() {
    const selectedDistrict = this.props.match.params.districtName;
    this.props.loadProjectData(selectedDistrict);
  }

  onDistrictChange = (evt) => {
    const districtName = evt?.target.selectedOptions?.[0].value;
    const showAll = districtName === 'all';
    const selectedDistrict = showAll ? false : districtName;
    const nextRoute = selectedDistrict ? `/${selectedDistrict}` : '';

    this.props.history.push(`/analyse/planungen${nextRoute}`);
    this.props.setDistrictFilter(selectedDistrict);
  };

  onPhaseFilterChange = (evt) => {
    const phaseValue = evt?.target.selectedOptions?.[0].value;
    const showAll = phaseValue === 'all';
    const selectedPhase = showAll ? false : phaseValue;
    this.props.setPhaseFilter(selectedPhase);
  };

  onSort = (evt) => {
    const sortValue = evt?.target.selectedOptions?.[0].value;
    this.props.setSort(sortValue);
  };

  render() {
    const {
      data,
      isLoading,
      selectedDistrict,
      selectedPhase,
      selectedSort,
    } = this.props;

    // for the pie chart we only filter by district
    const filteredDataDistrict = data.filter(filterDistrict(selectedDistrict));

    // for the list we filter by district AND phase
    const filteredData = filteredDataDistrict.filter(
      filterPhase(selectedPhase)
    );

    const hasData = filteredData.length > 0;
    const { sortDirection } = selectedSort
      ? sortOptions.find((s) => s.value === selectedSort)
      : { sortDirection: 'ASC' };
    const sortedData = filteredData.sort(
      sortByKey(selectedSort, sortDirection)
    );

    return (
      <AnalysisWrapper>
        <AnalysisContent>
          <AnalysisHeader>
            <StyledMenuButton />
            <Title>Analyse</Title>
          </AnalysisHeader>
          <Card>
            <Flex justifyContent="space-between">
              <StyledSelect
                title="Wähle einen Bezirk:"
                options={districtOptions}
                onChange={this.onDistrictChange}
                disabled={isLoading}
                value={selectedDistrict || 'all'}
                isVisible={!isLoading}
              />
              <StyledSelect
                title="Phase filtern:"
                options={phaseOptions}
                onChange={this.onPhaseFilterChange}
                disabled={isLoading}
                value={selectedPhase || 'all'}
              />
            </Flex>
            <PieChart data={filteredData} isLoading={isLoading} />
          </Card>

          <AnalysisControls isVisible={!isLoading && hasData}>
            <Select
              title="Sortieren:"
              options={sortOptions}
              onChange={this.onSort}
              disabled={isLoading}
              value={selectedSort || 'likes'}
            />
          </AnalysisControls>

          <ProjectList
            data={sortedData}
            isLoading={isLoading}
            showLoadingIndicator={false}
          />
        </AnalysisContent>
      </AnalysisWrapper>
    );
  }
}

export default connector(Analysis);
