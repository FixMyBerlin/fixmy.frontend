import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { numberFormat } from '~/utils';
import detailWrapped from '~/hocs/detailWrapped';
import dummyImageSrc from '~/images/detail-dummy.png';
import HBISign from '~/components/HBISign';
import InfoSection from './InfoSection';
import SwitchButton from './SwitchButton';

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0 20px 0;
  background: ${config.colors.lightbg};
`;

const DetailImage = styled.img`
  width: 100%;
`;

const HBISignWrapper = styled.div`
  position: relative;
  margin: -30px 0 20px 0;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
`;

const HBILabel = styled.div`
  font-size: 14px;
  margin: 10px 0 5px 0;
`;

const HBISubLabel = styled.div`
  font-size: 10px;
  color: ${config.colors.inactivegrey};
`;

const DetailInfoWrapper = styled.div`
  padding: 0 16px;
`;

const DetailTitle = styled.h1`
  font-size: 22px;
  color: ${config.colors.darkbg};
  font-family: 'Roboto Slab', serif;
  border-bottom: 1px dotted #c6c6c6;
  padding-bottom: 8px;
  margin-bottom: 20px;
`;

const DescriptionLink = styled.div`
  color: ${config.colors.interaction};
  text-align: center;
  font-size: 14px;
`;

class SectionDetails extends PureComponent {
  state = {
    sideIndex: 0
  }

  onSwitchSide = (sideIndex) => {
    return () => this.setState({ sideIndex });
  }

  render() {
    const { data } = this.props;
    const { sideIndex } = this.state;
    const { name } = data;
    const sideData = data.details[sideIndex];

    return (
      <React.Fragment>
        <ButtonGroup>
          <SwitchButton
            activeSideIndex={sideIndex}
            sideIndex={0}
            title="Westseite"
            side="left"
            onClick={this.onSwitchSide}
          />
          <SwitchButton
            activeSideIndex={sideIndex}
            sideIndex={1}
            title="Ostseite"
            side="right"
            onClick={this.onSwitchSide}
          />
        </ButtonGroup>

        <DetailImage src={dummyImageSrc} alt={name} />

        <HBISignWrapper>
          <HBISign hbi={1} />
          <HBILabel>Happy-Bike-Level</HBILabel>
          <HBISubLabel>(max 10,0)</HBISubLabel>
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

          <InfoSection title="Qualität:" color="#f2b19d" label="schlecht ausgebaut">
            <div>Radinfrabedarf: hoch/niedrig</div>
            <div>Breite: <strong>2,20 Meter</strong></div>
            <div>Oberfläche: Asphalt</div>
          </InfoSection>

          <InfoSection title="Zustand:" color="#0ecdba" label="gut">
            <div>sanierungsbedürftig: <strong>nein</strong></div>
          </InfoSection>

          <DescriptionLink>
            Wie wird der Happy-Bike-Level berechnet?
          </DescriptionLink>
        </DetailInfoWrapper>
      </React.Fragment>
    );
  }
}

export default detailWrapped(SectionDetails);
