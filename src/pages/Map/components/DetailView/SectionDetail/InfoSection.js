import React from 'react';
import styled from 'styled-components';

import { numberFormat } from '~/utils/utils';
import SectionTitle from '~/components/SectionTitle';
import Label from '~/components/Label';

const InfoSection = styled.div`
  margin: 32px 0 24px 0;
`;

const InfoSectionHeader = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const InfoSectionContent = styled.div`
  flex-grow: 1;
  font-size: 14px;
  color: ${config.colors.darkgrey};
  line-height: 1.4;
`;

const InfoSectionTitleWrapper = styled.div`
  flex-grow: 1;
  border-bottom: 1px solid ${config.colors.lightgrey};
  padding-bottom: 4px;
  max-width: 80%;
`;

const InfoSectionTitle = styled(SectionTitle)`
  padding: 0 0 4px 0;
  margin: 0;
`;

const InfoSectionStatus = styled.div`
  width: 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StatusSign = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${props => props.color || '#eee'};
  margin-bottom: 5px;
  color: white;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
`;

const StatusLabel = styled.div`
  font-size: 10px;
  color: ${config.colors.mediumgrey};
`;

export default props => (
  <InfoSection className={props.className}>
    <InfoSectionHeader>
      <InfoSectionTitleWrapper>
        <InfoSectionTitle>{props.title}</InfoSectionTitle>
        {props.info && <Label light>{props.info}</Label>}
      </InfoSectionTitleWrapper>
      <InfoSectionStatus>
        <StatusSign color={props.color}>
          {numberFormat(props.value, 1)}
        </StatusSign>
        <StatusLabel>{props.label}</StatusLabel>
      </InfoSectionStatus>
    </InfoSectionHeader>
    <InfoSectionContent>
      {props.children}
    </InfoSectionContent>

  </InfoSection>
);
