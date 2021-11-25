import React from 'react';
import styled from 'styled-components';

import { AnchorButton } from '~/components2/Button';
import config from '~/config';
import BikestandsIcon from '~/images/reports/bikestands-icon.svg';
import { getReportStatusCaption } from '~/pages/Reports/apiservice';
import ReportPin from '~/pages/Reports/components/ReportPin';
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

const DetailsHeading = styled(Heading)`
  font-size: 1.4em;
`;

const EditButton = styled(AnchorButton)`
  height: 2em;
`;

const getEditURL = (id) => {
  const adminBaseURL = config.apiUrl.replace('/api', '/admin');
  return `${adminBaseURL}/reports/bikestands/${id}/change/`;
};

const DetailsHeader = ({ details: { number }, status, id }) => (
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

    {config.debug === true && (
      <StatusIndicatorWrapper>
        <EditButton flat target="_blank" href={getEditURL(id)}>
          Edit
        </EditButton>
      </StatusIndicatorWrapper>
    )}
  </>
);

export default DetailsHeader;
