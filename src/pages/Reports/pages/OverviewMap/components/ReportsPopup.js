import React, { PureComponent } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import idx from 'idx';
import { X } from 'react-feather';
import { connect } from 'react-redux';

import { breakpoints } from '~/styles/utils';
import { setSelectedReport } from '~/pages/Reports/ReportsState';

// TODO: add like feature

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.3);
  pointer-events: none; // does not work. TODO: actually prevent usage of underlying controls
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupWrapper = styled.div`
  background-color: white;
  position: relative;
  border-radius: 2px;
  box-shadow: 0 12px 11px 0 rgba(0, 0, 0, 0.3), 0 0 19px 0 rgba(0, 0, 0, 0.22);
  // TODO: add little kink in the bottom like in specified zeplin
  width: 90%;
  max-width: ${breakpoints.s}px;
  pointer-events: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const MainSection = styled.div`
  padding: 11px;
`;

const PreviewImageContainer = styled.div`
  height: 200px;
  width: 100%;
  background-size: contain;
  background: no-repeat center;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 9px;
  top: -16px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: solid 1.1px #595959;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CloseIcon = styled(X)`
  color: #595959;
`;

const DetailsLink = styled(Link)`
  display: block;
  width: 168px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid ${config.colors.interaction};
  color: ${config.colors.darkgrey};
  margin: 0 auto;
  font-size: 18px;
  text-align: center;
  line-height: 48px;
  text-decoration: none;
  cursor: pointer;
`;

const Address = styled.h3`
  font-weight: normal;
  text-transform: uppercase;
  font-size: 14px;
  letter-spacing: 0.2px;
  color: #999999;
`;

const NumberStatement = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
  line-height: 1.32;
`;

class ReportsPopup extends PureComponent {
  render() {
    const { selectedReport, onClose } = this.props;
    const photoSrc = idx(selectedReport, _ => _.photo.src);

    if (!selectedReport) return null;

    return (
      <Wrapper>
        <PopupWrapper>
          {photoSrc && (
            <PreviewImageContainer
              style={{
                backgroundImage: `url(${photoSrc})`
              }}
            />
          )}
          <CloseButton onClick={onClose}>
            <CloseIcon />
          </CloseButton>
          <MainSection>
            <Address>{selectedReport.address}</Address>
            <NumberStatement>{`${selectedReport.details.number} neue Fahrradbügel benötigt`}</NumberStatement>
            <DetailsLink to={`${config.routes.reports.map}/${selectedReport.id}`}>Details</DetailsLink>
          </MainSection>
        </PopupWrapper>
      </Wrapper>
    );
  }
}

export default withRouter(
  connect(state => ({
    selectedReport: state.ReportsState.selectedReport,
    reports: state.ReportsState.reports
  }), { setSelectedReport })(ReportsPopup)
);
