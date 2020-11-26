import React, { PureComponent } from 'react';
import styled from 'styled-components';
import idx from 'idx';

import config from '~/config';
import DataProcessIcon from '~/images/data-process.svg';
import { numberFormat, percentageFormat } from '~/utils/utils';
import { getOrientationNames } from '~/apps/Map/hbi-utils';
import HBISign from '~/apps/Map/components/HBISign';
import Label from '~/components/Label';
import Title from '~/components/Title';
import detailWrapped from '~/apps/Map/components/DetailView/detailWrapped';
import DetailSwitch, {
  ButtonGroup,
} from '~/apps/Map/components/DetailView/DetailSwitch';
import ImageSlider from '~/apps/Map/components/DetailView/ImageSlider';
import InfoSection from './InfoSection';
import {
  getSafetyLabel,
  getSafetyColor,
  getRoadTypeLabel,
  getStreetCategoryLabel,
  getInfrastructureLabel,
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
  border-bottom: 2px dotted #c6c6c6;
  margin: 10px 0 20px 0;
`;

const DescriptionLink = styled.div`
  color: ${config.colors.interaction};
  text-align: center;
  font-size: 14px;
`;

const BetaWrapper = styled.div`
  position: relative;
`;

const BetaOverlay = styled.div`
  position: absolute;
  background: white;
  opacity: 0.75;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

const StyledDataProcessIcon = styled(DataProcessIcon)`
  position: absolute;
  z-index: 99;
  left: 50%;
  top: 10px;
  margin-left: -100px;
  transform: rotate(-6deg);
`;

const InfoSectionTextWrapper = styled.div`
  margin: 16px 0;
`;

const InfoSectionText = styled.div`
  display: flex;
  font-weight: ${(props) => (props.bold ? 700 : 500)};
`;

const InfoSectionTextSmall = styled(InfoSectionText)`
  font-size: 10px;
`;

const InfoSectionTextLeft = styled.div`
  min-width: ${(props) => (props.grow ? 'none' : '150px')};
  flex-grow: ${(props) => (props.grow ? 1 : 'unset')};
`;

const InfoSectionTextRight = styled.div`
  margin-left: auto;
`;

class SectionDetails extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sideIndex: 0,
    };
  }

  onSwitchSide = (sideIndex) => () => this.setState({ sideIndex });

  render() {
    const { data } = this.props;
    const { sideIndex } = this.state;
    const { name, details } = data;
    const sideData = data.details[sideIndex];
    const hasSwitchButton = data.details && data.details.length > 1;
    const orientationNames = getOrientationNames(
      idx(data, (_) => _.details[0].orientation),
      idx(data, (_) => _.details[1].orientation)
    );

    if (!sideData) {
      return <div>Keine Daten vorhanden.</div>;
    }

    const photos =
      details.length > 2
        ? details[sideIndex + 2].photos
        : details[sideIndex].photos;
    const safetyLabel = getSafetyLabel(sideData);
    const safetyColor = getSafetyColor(sideData);
    const roadTypeLabel = getRoadTypeLabel(sideData);
    const streetCategoryLabel = getStreetCategoryLabel(data);
    const infrastructureLabel = getInfrastructureLabel(sideData);
    const infrastructureDesc = getInfrastructureDesc(sideData);
    const currentSideName = orientationNames[`side${sideIndex}`];

    return (
      <>
        {hasSwitchButton && (
          <ButtonGroup>
            <DetailSwitch
              activeSideIndex={sideIndex}
              sideIndex={0}
              title={orientationNames.side0}
              side="left"
              onClick={this.onSwitchSide}
            />
            <DetailSwitch
              activeSideIndex={sideIndex}
              sideIndex={1}
              title={orientationNames.side1}
              side="right"
              onClick={this.onSwitchSide}
            />
          </ButtonGroup>
        )}

        <ImageSlider images={photos} />

        <HBISignWrapper>
          <HBISign hbi={sideData.happy_bike_index} />
          <Label margin="10px 0 3px 0">
            Happy-Bike-Level - {currentSideName}
          </Label>
          <Label light>(max 10,0)</Label>
        </HBISignWrapper>

        <DetailInfoWrapper>
          <DetailTitle>Daten zu: {name}</DetailTitle>

          <InfoSection
            title="Sicherheit:"
            color={safetyColor}
            label={safetyLabel}
            value={sideData.safety_index}
            info="Wie sicher ist es hier für Radfahrende?"
          >
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
                  Schutzfunktion der Radwege
                </InfoSectionTextLeft>
                <InfoSectionTextRight>
                  {infrastructureLabel}
                </InfoSectionTextRight>
              </InfoSectionText>

              {sideData.bike_path_ratio > 0 && (
                <InfoSectionText>
                  <InfoSectionTextLeft>Radweg:</InfoSectionTextLeft>
                  {percentageFormat(sideData.bike_path_ratio)}
                </InfoSectionText>
              )}

              {sideData.shared_use_path_ratio > 0 && (
                <InfoSectionText>
                  <InfoSectionTextLeft>
                    Fahren auf Gehweg erlaubt:
                  </InfoSectionTextLeft>
                  {percentageFormat(sideData.shared_use_path_ratio)}
                </InfoSectionText>
              )}

              {sideData.bike_lane_ratio > 0 && (
                <InfoSectionText>
                  <InfoSectionTextLeft>Radfahrstreifen:</InfoSectionTextLeft>
                  {percentageFormat(sideData.bike_lane_ratio)}
                </InfoSectionText>
              )}

              {sideData.protected_bike_lane_ratio > 0 && (
                <InfoSectionText>
                  <InfoSectionTextLeft>
                    geschützter Radfahrstreifen:
                  </InfoSectionTextLeft>
                  {percentageFormat(sideData.protected_bike_lane_ratio)}
                </InfoSectionText>
              )}

              {sideData.advisory_bike_lane_ratio > 0 && (
                <InfoSectionText>
                  <InfoSectionTextLeft>Schutzstreifen:</InfoSectionTextLeft>
                  {percentageFormat(sideData.advisory_bike_lane_ratio)}
                </InfoSectionText>
              )}

              <InfoSectionTextSmall>{infrastructureDesc}</InfoSectionTextSmall>
            </InfoSectionTextWrapper>
          </InfoSection>

          <DescriptionLink>
            <a href="/faq">Wie wird der Happy-Bike-Level berechnet?</a>
          </DescriptionLink>

          <BetaWrapper>
            <StyledDataProcessIcon />
            <InfoSection title="Qualität:" color="" label="">
              <div>Radinfrabedarf: ?</div>
              <div>Breite: ?</div>
              <div>Oberfläche: ?</div>
            </InfoSection>

            <InfoSection title="Zustand:" color="" label="" />
            <BetaOverlay />
          </BetaWrapper>
        </DetailInfoWrapper>
      </>
    );
  }
}

export default detailWrapped(SectionDetails);
