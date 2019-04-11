import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import ReportDetailsShape from '~/images/reports/report-details-shape.png';

// TODO: split up in subcomponents (Topbar etc.) just like Reports/Landing

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 999999999999999;
  background-color: white;
`;

const TopBar = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 16px;
  min-height: 52px;
  background-color: ${config.colors.lightgrey};
`;

const CloseIcon = styled(X)`
  color: ${config.colors.black};
  cursor: pointer;
`;

const TopBarContent = styled.div`
  flex-grow: 2;
  margin-left: 24px;
`;

const TopBarIcon = styled.img`
  width: 26px;
  height: 31px;
`;

const Address = styled.p`
 font-size: 14px;
 color: ${config.colors.darkgrey};
 font-weight: 600;
 text-transform: uppercase;
 letter-spacing: 0.2px;
 margin: 0 0 3px;

`;

const ReportId = styled.p`
  color: #999999;
  font-size: 10px;
  line-height: 1.2;
  letter-spacing: 0.2px;
  margin: 0;
`;

const ReportImage = styled.img`
  width: 100%;
`;

const MainSection = styled.div`
  padding: 16px;
`;

// TODO: copied, de-dupe
const Heading = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
  line-height: 1.32;
  margin-top: 0;
  margin-bottom: 20px;
`;

const Description = styled.p`
 color: rgba(0, 0, 0, 0.54);
 line-height: 1.71;
 font-size: 14px;
`;

const LikeSection = styled.div`
  width: 100%;
  height: 140px;
  background-color: ${config.colors.likebg};
  position: absolute;
  bottom: 0;
`

// removes zipcode and city
const formatAddressString = address => address
  .replace('Berlin', '')
  .replace(/\b\d{5}\b/g, '')
  .trim();

const ReportDetails = ({ reportItem, onClose }) => (
  <Wrapper>
    <TopBar>
      <TopBarIcon src={ReportDetailsShape} alt="Report Details" />
      <TopBarContent>
        <Address>{
          formatAddressString(reportItem.location.address)
        }
        </Address>
        <ReportId>Meldung {reportItem.id}</ReportId>
      </TopBarContent>
      <CloseIcon onClick={onClose} />
    </TopBar>

    {reportItem.photo && (<ReportImage src={`data:image/jpg;base64,${reportItem.photo}`} />)}

    <MainSection>
      <Heading>{`${reportItem.details.number} neue Fahrradbügel benötigt`}</Heading>
      <Description>{reportItem.description}</Description>
    </MainSection>

    <LikeSection />
  </Wrapper>
);

ReportDetails.propTypes = {
  reportItem: PropTypes.objectOf(PropTypes.any).isRequired, // TODO: fix other propType declarations where an object is used
  onClose: PropTypes.func.isRequired
};


export default ReportDetails;
