import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { X } from 'react-feather';
import ReportDetailsShape from '~/images/reports/report-details-shape.png';

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
`;

const CloseIcon = styled(X)`
  color: ${config.colors.black};
  cursor: pointer;
`;

const TopBarContent = styled.div`
  flex-grow: 2;
`;

const TopBarIcon = styled.img`
  width: 16px;
  height: 22px;
`;

const Address = styled.div`
 font-size: 14px;
 color: ${config.colors.darkgrey};
 font-weight: 600;
 text-transform: uppercase;
 letter-spacing: 0.2px;
 
 p {
  margin: 0;
 }
`;

const ReportId = styled.p`
  color: #999999;
  font-size: 10px;
  line-height: 1.2;
  letter-spacing: 0.2px;
`;

const ReportImage = styled.img`
  width: 100%;
`;

// TODO: copied, de-dupe
const NumberStatement = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
  line-height: 1.32;
`;

const Description = styled.p`
 color: rgba(0, 0, 0, 0.54);
 line-height: 1.71;
 font-size: 14px;
`;

const ReportDetails = ({ reportItem, onClose }) => (
  <Wrapper>
    <TopBar>
      <TopBarIcon src={ReportDetailsShape} alt="Report Details" />
      <TopBarContent>
        <Address>{
          reportItem.location.address
          .split(', ')
          .map((part, i) => (<p key={`address-part-${i}`}>{part}</p>))
        }
        </Address>
        <ReportId>Meldung {reportItem.id}</ReportId>
      </TopBarContent>


      <CloseIcon onClick={onClose} />
    </TopBar>


    {reportItem.photo && (<ReportImage src={`data:image/jpg;base64,${reportItem.photo}`} />)}

    <NumberStatement>{`${reportItem.details.number} neue Fahrradbügel benötigt`}</NumberStatement>

    <Description>{reportItem.description}</Description>

  </Wrapper>
);

ReportDetails.propTypes = {
  reportItem: PropTypes.objectOf(PropTypes.any).isRequired, // TODO: fix other propType declarations where an object is used
  onClose: PropTypes.func.isRequired
};


export default ReportDetails;
