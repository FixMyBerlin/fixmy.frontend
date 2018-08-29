import React from 'react';
import styled from 'styled-components';

import SectionTitle from '~/components/SectionTitle';

const InfoSection = styled.div`
  display: flex;
  margin-bottom: 24px;
  max-width: 80%;
`;

const InfoSectionContent = styled.div`
  flex-grow: 1;
`;

const InfoSectionTitle = SectionTitle.extend`
  border-bottom: 1px solid ${config.colors.lightgrey};
  padding-bottom: 16px;
`;

const InfoSectionData = styled.div`
  font-size: 14px;
  color: ${config.colors.darkgrey};
  line-height: 1.4;
`;

const InfoSectionStatus = styled.div`
  width: 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatusSign = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${props => props.color || '#eee'};
  margin-bottom: 5px;
`;

const StatusLabel = styled.div`
  font-size: 10px;
  color: ${config.colors.mediumgrey};
`;

export default props => (
  <InfoSection className={props.className}>
    <InfoSectionContent>
      <InfoSectionTitle>{props.title}</InfoSectionTitle>
      <InfoSectionData>
        {props.children}
      </InfoSectionData>
    </InfoSectionContent>
    {!config.sectionIsBeta && <InfoSectionStatus>
      <StatusSign color={props.color} />
      <StatusLabel>{props.label}</StatusLabel>
    </InfoSectionStatus>}
  </InfoSection>
);
