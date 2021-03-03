import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';

import config from '~/pages/Reports/config';
import { media } from '~/styles/utils';
import { actions } from '~/pages/Reports/state/OverviewMapState';
import { MapPopup } from '~/components2/MapPopup';
import Button from '~/components/Button';
import Title from '~/components/Title';
import { STATUS_PLANNING } from '~/pages/Reports/apiservice';

const PreviewImage = styled.div`
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

const Wrapper = styled(MapPopup)`
  padding: 16px;
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
    const photoSrc = selectedReport?.photo?.src;
    const isSmallScreen = window.innerWidth <= 768;

    if (!selectedReport) return null;

    const x = isSmallScreen ? 0 : position.x;
    const y = isSmallScreen ? 0 : position.y;

    const { number } = selectedReport.details;

    let popupTitle;
    if (selectedReport.status === 'done') {
      popupTitle = `${number} Fahrradbügel gebaut`;
    } else if (STATUS_PLANNING.includes(selectedReport.status)) {
      popupTitle = `${number} Fahrradbügel in Planung`;
    } else {
      popupTitle = `${number} neue${
        number === 1 ? 'r' : ''
      } Fahrradbügel gewünscht`;
    }

    return (
      <Wrapper
        x={x}
        y={y}
        data={selectedReport}
        onClick={() => this.onDetailClick()}
        onClose={() => onClose()}
        showSubline={false}
      >
        {photoSrc != null && (
          <Link to={`${config.routes.reports.map}/${selectedReport.id}`}>
            <PreviewImage
              style={{
                backgroundImage: `url(${photoSrc})`,
              }}
            />
          </Link>
        )}
        <Title data-cy="reports-popup-title">{popupTitle}</Title>
        <ButtonWrapper>
          <Button
            data-cy="reports-popup-button"
            onClick={() => this.onDetailClick()}
          >
            mehr Infos
          </Button>
        </ButtonWrapper>
      </Wrapper>
    );
  }
}

export default withRouter(
  connect(
    (state) => ({
      selectedReport: state.ReportsState.OverviewMapState.selectedReport,
      reports: state.ReportsState.OverviewMapState.reports,
      position: state.ReportsState.OverviewMapState.selectedReportPosition,
    }),
    { setSelectedReport: actions.setSelectedReport }
  )(ReportsPopup)
);
