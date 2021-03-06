import React from 'react';
import styled from 'styled-components';

import ImageSlider from '~/apps/Map/components/DetailView/ImageSlider';
import HBISign from '~/apps/Map/components/HBISign';
import Title from '~/components/Title';
import Label from '~/components2/Label';
import config from '~/config';
import { useTypedSelector } from '~/store';
import { numberFormat, percentageFormat } from '~/utils/utils';

import { SectionsFAQ } from './FAQs';
import {
  getRoadTypeLabel,
  getStreetCategoryLabel,
  getInfrastructureDesc,
} from './status-utils';

const HBISignWrapper = styled.div`
  position: relative;
  margin: -30px 0 20px 0;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;

  > div {
    cursor: default;
  }
`;

const DetailInfoWrapper = styled.div`
  padding: 0 16px;
`;

const DetailTitle = styled(Title)`
  border-bottom: 1px dashed #c6c6c6;
  margin: 10px 0 20px 0;
  padding: 0.5em 0;
`;

const InfoSectionTextWrapper = styled.div`
  margin: 16px 0;
`;

const InfoSectionText = styled.div<{ bold?: boolean }>`
  display: flex;
  font-weight: ${(props) => (props.bold ? 700 : 500)};
`;

const InfoSectionTextSmall = styled(InfoSectionText)`
  font-size: 10px;
`;

const InfoSectionTextLeft = styled.div<{ grow?: boolean }>`
  min-width: ${(props) => (props.grow ? 'none' : '150px')};
  flex-grow: ${(props) => (props.grow ? 1 : 'unset')};
`;

const InfoSectionTextRight = styled.div`
  margin-left: auto;
`;

const InfoSection = styled.div`
  margin: 32px 0 24px 0;
`;

const InfoSectionContent = styled.div`
  flex-grow: 1;
  font-size: 14px;
  color: ${config.colors.darkgrey};
  line-height: 1.4;
`;

/**
 * Don't use fractions here to not suggest a higher precision than we have
 */
const HBIPercentageFormat = (value: number) =>
  percentageFormat(value, 'de', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const BodySection = ({ orientationName, sideIndex }) => {
  const data = useTypedSelector(({ MapState }) => MapState.hbiData);
  const sideData = data.details[sideIndex];
  if (!sideData) {
    return <div>Keine Daten vorhanden.</div>;
  }

  const { street_name: streetName, details } = data;
  const photos =
    details.length > 2
      ? details[sideIndex + 2].photos
      : details[sideIndex].photos;
  const roadTypeLabel = getRoadTypeLabel(sideData);
  const streetCategoryLabel = getStreetCategoryLabel(data);
  const infrastructureDesc = getInfrastructureDesc(sideData);

  return (
    <>
      <ImageSlider images={photos} />

      <HBISignWrapper>
        <HBISign />
        <Label margin="10px 0 3px 0">
          Happy-Bike-Index - {orientationName}
        </Label>
        <Label>
          <strong>fehlende Daten</strong>
        </Label>
      </HBISignWrapper>

      <DetailInfoWrapper>
        <DetailTitle>Daten zu: {streetName}</DetailTitle>

        <InfoSection>
          <InfoSectionContent>
            <InfoSectionTextWrapper>
              <InfoSectionText bold>
                <InfoSectionTextLeft grow>
                  Situation KFZ-Verkehr
                </InfoSectionTextLeft>
                <InfoSectionTextRight>{roadTypeLabel}</InfoSectionTextRight>
              </InfoSectionText>
              <InfoSectionText>
                <InfoSectionTextLeft>Straßentyp:</InfoSectionTextLeft>
                {streetCategoryLabel}
              </InfoSectionText>
              <InfoSectionText>
                <InfoSectionTextLeft>Tempolimit:</InfoSectionTextLeft>
                {sideData.speed_limit}
              </InfoSectionText>
              <InfoSectionText>
                <InfoSectionTextLeft>KFZ pro Tag:</InfoSectionTextLeft>
                {numberFormat(sideData.daily_traffic)}
              </InfoSectionText>
            </InfoSectionTextWrapper>

            <InfoSectionTextWrapper>
              <InfoSectionText bold>
                <InfoSectionTextLeft grow>
                  Vorhandene Radinfrastruktur
                </InfoSectionTextLeft>
              </InfoSectionText>

              {sideData.bike_path_ratio > 0 && (
                <InfoSectionText>
                  <InfoSectionTextLeft>Radweg:</InfoSectionTextLeft>
                  {HBIPercentageFormat(sideData.bike_path_ratio)}
                </InfoSectionText>
              )}

              {sideData.shared_use_path_ratio > 0 && (
                <InfoSectionText>
                  <InfoSectionTextLeft>
                    Fahren auf Gehweg erlaubt:
                  </InfoSectionTextLeft>
                  {HBIPercentageFormat(sideData.shared_use_path_ratio)}
                </InfoSectionText>
              )}

              {sideData.bike_lane_ratio > 0 && (
                <InfoSectionText>
                  <InfoSectionTextLeft>Radfahrstreifen:</InfoSectionTextLeft>
                  {HBIPercentageFormat(sideData.bike_lane_ratio)}
                </InfoSectionText>
              )}

              {sideData.protected_bike_lane_ratio > 0 && (
                <InfoSectionText>
                  <InfoSectionTextLeft>
                    geschützter Radfahrstreifen:
                  </InfoSectionTextLeft>
                  {HBIPercentageFormat(sideData.protected_bike_lane_ratio)}
                </InfoSectionText>
              )}

              {sideData.advisory_bike_lane_ratio > 0 && (
                <InfoSectionText>
                  <InfoSectionTextLeft>Schutzstreifen:</InfoSectionTextLeft>
                  {HBIPercentageFormat(sideData.advisory_bike_lane_ratio)}
                </InfoSectionText>
              )}

              <InfoSectionTextSmall>{infrastructureDesc}</InfoSectionTextSmall>
            </InfoSectionTextWrapper>
          </InfoSectionContent>
        </InfoSection>

        <SectionsFAQ />
      </DetailInfoWrapper>
    </>
  );
};
