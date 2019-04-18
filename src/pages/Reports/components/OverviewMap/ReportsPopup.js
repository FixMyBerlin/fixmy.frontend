import React, { PureComponent, Fragment } from 'react';
import withRouter from 'react-router-dom/withRouter';
import { Router, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { breakpoints } from '~/styles/utils';
import { X } from 'react-feather';
import history from '~/history';
import { connect } from 'react-redux';
import ReportDetails from './ReportDetails';
import { setSelectedReport, unsetSelectedReport } from '../../ReportsState';

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
  background-size: cover;
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
  async componentDidMount() {
    this.props.setSelectedReport(Number(this.props.match.params.reportId));
  }

  componentWillUnmount() {
    this.props.unsetSelectedReport();
  }

  render() {
    const { selectedReport, onClose, match } = this.props;
    if (!selectedReport) return null;

    return (
      <Router history={history}>

        <Fragment>
          {
            match.isExact && (
              <Wrapper>
                <PopupWrapper>
                  {selectedReport.photo && (
                    <PreviewImageContainer
                      style={
                        // during development, urls are base64 encoded. In production, normal URLs are used
                        {
                          backgroundImage: selectedReport.photo.startsWith('data:image/') ? `url(${selectedReport.photo})` : selectedReport.photo
                        }
                      }
                    />
                  )}
                  <CloseButton onClick={onClose}>
                    <CloseIcon />
                  </CloseButton>
                  <MainSection>
                    <Address>{selectedReport.address}</Address>
                    <NumberStatement>{`${selectedReport.details.number} neue Fahrradbügel benötigt`}</NumberStatement>
                    <DetailsLink to={`${match.url}${config.routes.reports.reportDetails}`}>Details</DetailsLink>
                  </MainSection>
                </PopupWrapper>
              </Wrapper>
            )
          }


          <Route
            path={`${match.path}${config.routes.reports.reportDetails}`}
            render={() => (
              <ReportDetails
                onClose={() => history.push(match.url)}
                reportId={selectedReport.id}
                address={selectedReport.address}
                photo={selectedReport.photo}
                number={selectedReport.details.number}
                description={selectedReport.description}
              />
            )}
          />
        </Fragment>
      </Router>
    );
  }
}


export default withRouter(
  connect(state => ({
    selectedReport: state.ReportsState.selectedReport,
    reports: state.ReportsState.reports
  }), { setSelectedReport, unsetSelectedReport })(ReportsPopup)
);
