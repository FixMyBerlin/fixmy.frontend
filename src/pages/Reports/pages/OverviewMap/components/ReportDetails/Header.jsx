import React from 'react';
import styled from 'styled-components';

import config from '~/config';
import { getReportStatusCaption } from '~/pages/Reports/apiservice';
import ReportPin from '~/pages/Reports/components/ReportPin';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';

/* eslint-disable import/no-unresolved */
import BikestandsIcon from '~/images/reports/bikestands-icon.svg?component';

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

const DetailsHeading = styled(Heading)`
  font-size: 1.4em;
`;

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
      <ReportPin status={status} />
    </StatusIndicatorWrapper>
  </>
);

export default DetailsHeader;
