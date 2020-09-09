import React from 'react';
import styled from 'styled-components';
import BikestandsIcon from '~/images/reports/bikestands-icon.svg';
import utils from '~/pages/Reports/utils';

import { getReportStatusCaption } from '~/pages/Reports/apiservice';

import config from '~/pages/Reports/config';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';

const HeadlineSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BikeStandsCountSection = styled.div`
  margin-left: 16px;
`;

const BikeStandsCount = styled.p`
  margin-top: 4px;
  margin-bottom: 0;
  text-align: center;
  font-size: 14px;
  color: #999999;
`;

const StatusIndicator = styled.p`
  font-size: 22px;
  font-weight: 300;
  line-height: 1.32;
  color: ${config.colors.black};
`;

const StatusIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ReportPin = styled.img.attrs((props) => ({
  src: utils.getMarkerSrc({ status: props.status }),
  alt: 'A marker icon'
}))`
  margin-left: auto;
  width: ${(props) => (props.small ? '20px' : '40px')};
  height: ${(props) => (props.small ? '20px' : '50px')};
`;

const DetailsHeading = styled(Heading)`
  font-size: 1.4em;
`;

// statuses for which marker images are small
const smallMarkers = [
  'report_verification',
  'report_accepted',
  'report_rejected',
  'report_inactive',
  // deprecated
  'verification',
  'accepted',
  'rejected'
];

const DetailsHeader = ({ details: { number }, status }) => (
  <>
    <HeadlineSection data-cy="reports-detail-title">
      <DetailsHeading alignLeft>
        {status !== 'done' && (
          <>
            {number} neue{number === 1 ? 'r' : null} Fahrradbügel gewünscht
          </>
        )}
        {status === 'done' && <>{number} Fahrradbügel gebaut</>}
      </DetailsHeading>
      <BikeStandsCountSection>
        <BikestandsIcon />
        <BikeStandsCount>x{number}</BikeStandsCount>
      </BikeStandsCountSection>
    </HeadlineSection>

    <StatusIndicatorWrapper>
      <StatusIndicator data-cy="reports-detail-status">
        Status: {getReportStatusCaption(status)}
      </StatusIndicator>
      <ReportPin small={smallMarkers.indexOf(status) > -1} status={status} />
    </StatusIndicatorWrapper>
  </>
);

export default DetailsHeader;
