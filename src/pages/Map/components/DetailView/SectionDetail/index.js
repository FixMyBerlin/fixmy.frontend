import React, { PureComponent } from 'react';
import styled from 'styled-components';

import DataProcessIcon from '~/images/data-process.svg';
import { numberFormat } from '~/utils/utils';
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

    if (!sideData) {
      return <div>Keine Daten vorhanden.</div>;
    }

    const photos = details.length > 2 ? details[sideIndex + 2].photos : details[sideIndex].photos;

    return (
      <React.Fragment>
        <ButtonGroup>
          <DetailSwitch
            activeSideIndex={sideIndex}
            sideIndex={0}
            title="Westseite"
            side="left"
            onClick={this.onSwitchSide}
          />
          <DetailSwitch
            activeSideIndex={sideIndex}
            sideIndex={1}
            title="Ostseite"
            side="right"
            onClick={this.onSwitchSide}
          />
        </ButtonGroup>

        <ImageSlider images={photos} />

        <HBISignWrapper>
          <HBISign hbi={1} />
          <Label margin="10px 0 3px 0">Happy-Bike-Level</Label>
          <Label light>(max 10,0)</Label>
        </HBISignWrapper>

        <DetailInfoWrapper>
          <DetailTitle>
            Daten zu: {name}
          </DetailTitle>

          <InfoSection title="Sicherheit:" color="#ff650c" label="gefährlich">
            <div><strong>80% Schutzstreifen</strong></div>
            <div>20% kein Radweg vorhanden</div>

            <div>Art der Straße: Hauptstraße</div>
            <div>Tempolimit: <strong>{sideData.speed_limit}km/h</strong></div>
            <div>KFZ pro Tag: {numberFormat(sideData.daily_traffic)}</div>
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
        <FeedbackForm />
      </React.Fragment>
    );
  }
}

export default detailWrapped(SectionDetails);
