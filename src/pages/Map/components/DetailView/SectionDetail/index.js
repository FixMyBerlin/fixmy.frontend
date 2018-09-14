import React, { PureComponent } from 'react';
import styled from 'styled-components';

import DataProcessIcon from '~/images/data-process.svg';
import { numberFormat } from '~/utils/utils';
import { getOrientationNames } from '~/utils/hbi-utils';
import HBISign from '~/components/HBISign';
import Label from '~/components/Label';
import Title from '~/components/Title';
import detailWrapped from '~/pages/Map/components/DetailView/detailWrapped';
import DetailSwitch, { ButtonGroup } from '~/pages/Map/components/DetailView/DetailSwitch';
import FeedbackForm from '~/pages/Map/components/DetailView/FeedbackForm';
import ImageSlider from '~/pages/Map/components/DetailView/ImageSlider';

import InfoSection from './InfoSection';

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
  padding-bottom: 15px;
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
  width:100%;
  top:0;
  left:0;
`;

const StyledDataProcessIcon = styled(DataProcessIcon)`
  position: absolute;
  z-index: 99;
  right: 10px;
  transform: rotate(-6deg);
`;

class SectionDetails extends PureComponent {
  state = {
    sideIndex: 0
  }

  onSwitchSide = sideIndex => () => this.setState({ sideIndex })

  render() {
    const { data } = this.props;
    const { sideIndex } = this.state;
    const { name, details } = data;
    const sideData = data.details[sideIndex];
    const hasSwitchButton = data.details && data.details.length > 1;
    const orientationNames = getOrientationNames(sideData);

    if (!sideData) {
      return <div>Keine Daten vorhanden.</div>;
    }

    const photos = details.length > 2 ? details[sideIndex + 2].photos : details[sideIndex].photos;

    // safetyLabel
    if (sideData.safety_index >= 6) {
      var safetyLabel = 'sehr sicher';
    } else if (sideData.safety_index >= 4) {
      var safetyLabel = 'ok';
    } else if (sideData.safety_index >= 2) {
      var safetyLabel = 'gefährlich';
    } else {
      var safetyLabel = 'sehr gefährlich';
    }

    // roadTypeLabel
    if (sideData.road_type >= 3) {
      var roadTypeLabel = 'ruhiger Verkehr';
    } else if (sideData.road_type >= 2) {
      var roadTypeLabel = 'mittlerer Verkehr';
    } else if (sideData.road_type >= 1) {
      var roadTypeLabel = 'starker Verkehr';
    } else {
      var roadTypeLabel = 'sehr starker Verkehr';
    }

    // streetCategoryLabel
    if (data.street_category >= 5) {
      var streetCategoryLabel = 'Nebenstraße';
    } else {
      var streetCategoryLabel = 'Hauptstraße';
    }

    // infrastructureLabel
    if (sideData.cycling_infrastructure_safety >= 3) {
      var infrastructureLabel = 'sehr gut';
    } else if (sideData.cycling_infrastructure_safety >= 2) {
      var infrastructureLabel = 'gut';
    } else if (sideData.cycling_infrastructure_safety >= 1) {
      var infrastructureLabel = 'schwach';
    } else {
      var infrastructureLabel = 'keine';
    }

    // infrastructureDesc
    if (sideData.cycling_infrastructure_ratio >= 1) {
      var infrastructureDesc = '';
    } else if (sideData.cycling_infrastructure_ratio >= 0.65) {
      var infrastructureDesc = 'Radinfrastruktur überwiegend vorhanden';
    } else if (sideData.cycling_infrastructure_ratio >= 0.1) {
      var infrastructureDesc = 'Teilweise Radinfrastruktur vorhanden';
    } else {
      var infrastructureDesc = 'Keine oder ungenügende Radinfrastruktur vorhanden';
    }

    return (
      <React.Fragment>
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
          </ButtonGroup>)
        }

        <ImageSlider images={photos} />

        <HBISignWrapper>
          <HBISign hbi={sideData.happy_bike_index} />
          <Label margin="10px 0 3px 0">Happy-Bike-Level</Label>
          <Label light>(max 10,0)</Label>
        </HBISignWrapper>

        <DetailInfoWrapper>
          <DetailTitle>
            Daten zu: {name}
          </DetailTitle>

          <InfoSection title="Sicherheit:" color="#ff650c" label="{safetyLabel}">
            <div>Sicherheit: <strong>{sideData.safety_index}</strong></div>
            <div>Wie sicher ist es hier für Radfahrende? <strong>{safetyLabel}</strong></div>

            <div>Situation KFZ-Verkehr <strong>{roadTypeLabel}</strong></div>
            <div>Straßentyp: <strong>{streetCategoryLabel}</strong></div>
            <div>Tempolimit: <strong>{sideData.speed_limit} km/h</strong></div>
            <div>KFZ pro Tag: <strong>{numberFormat(sideData.daily_traffic)}</strong></div>
            <div>Schutzfunktion der Radwege <strong>{infrastructureLabel}</strong></div>
            <div><strong>{infrastructureDesc}</strong></div>
            <div><a href="#">Wie wird der Happy-Bike-Level gerechnet?</a></div>
          </InfoSection>

          <BetaWrapper>
            <StyledDataProcessIcon />
            <InfoSection title="Qualität:" color="#f2b19d" label="schlecht ausgebaut">
              <div>Radinfrabedarf: ?</div>
              <div>Breite: ?</div>
              <div>Oberfläche: ?</div>
            </InfoSection>

            <InfoSection title="Zustand:" color="#0ecdba" label="gut" />
            <BetaOverlay />
          </BetaWrapper>

          <DescriptionLink>
            Wie wird der Happy-Bike-Level berechnet?
          </DescriptionLink>
        </DetailInfoWrapper>
        {config.showFeedbackForm && <FeedbackForm />}
      </React.Fragment>
    );
  }
}

export default detailWrapped(SectionDetails);
