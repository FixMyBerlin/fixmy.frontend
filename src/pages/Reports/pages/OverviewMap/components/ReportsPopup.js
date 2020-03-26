import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import idx from 'idx';
import { connect } from 'react-redux';

import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';
import { actions } from '~/pages/Reports/state/OverviewMapState';
import MapPopupWrapper from '~/components/MapPopupWrapper';
import Button from '~/components/Button';
import Title from '~/components/Title';

const PreviewImageContainer = styled(Link)`
  height: 200px;
  width: 100%;
  background-size: contain;
  background: no-repeat center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  ${media.m`
    padding-bottom: 0;
  `}
`;

class ReportsPopup extends PureComponent {
  onDetailClick() {
    const { selectedReport } = this.props;
    this.props.history.push(
      `${config.routes.reports.map}/${selectedReport.id}`
    );
  }

  render() {
    const { selectedReport, onClose, position } = this.props;
    const photoSrc = idx(selectedReport, (_) => _.photo.src);
    const isSmallScreen = window.innerWidth <= 768;

    if (!selectedReport) return null;

    const x = isSmallScreen ? 0 : position.x;
    const y = isSmallScreen ? 0 : position.y;

    return (
      <MapPopupWrapper
        x={x}
        y={y}
        data={selectedReport}
        onClick={() => this.onDetailClick()}
        onClose={() => onClose()}
        showSubline={false}
        style={{ padding: 16 }}
      >
        {photoSrc && (
          <PreviewImageContainer
            to={`${config.routes.reports.map}/${selectedReport.id}`}
            style={{
              backgroundImage: `url(${photoSrc})`
            }}
          />
        )}
        <Title data-cy="reports-popup-title">
          {`${selectedReport.details.number} ${
            selectedReport.details.number === 1 ? 'r' : null
          } Fahrradbügel gewünscht`}
        </Title>
        <ButtonWrapper>
          <Button
            data-cy="reports-popup-button"
            onClick={() => this.onDetailClick()}
          >
            mehr Infos
          </Button>
        </ButtonWrapper>
      </MapPopupWrapper>
    );
  }
}

export default withRouter(
  connect(
    (state) => ({
      selectedReport: state.ReportsState.OverviewMapState.selectedReport,
      reports: state.ReportsState.OverviewMapState.reports,
      position: state.ReportsState.OverviewMapState.selectedReportPosition
    }),
    { setSelectedReport: actions.setSelectedReport }
  )(ReportsPopup)
);
