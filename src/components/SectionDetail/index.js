import React, { PureComponent } from 'react';
import styled from 'styled-components';

import DataProcessIcon from '~/images/data-process.svg';
import dummyImageSrc from '~/images/detail-dummy.png';
import { numberFormat } from '~/utils';
import detailWrapped from '~/hocs/detailWrapped';
import HBISign from '~/components/HBISign';
import Label from '~/components/styled/Label';
import Title from '~/components/styled/Title';
import DetailSwitch, { ButtonGroup } from '~/components/DetailSwitch';

import InfoSection from './InfoSection';

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

const DetailInfoWrapper = styled.div`
  padding: 0 16px;
`;

const DetailTitle = Title.extend`
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
    const { name } = data;
    const sideData = data.details[sideIndex];

    if (!sideData) {
      return <div>Keine Daten vorhanden.</div>;
    }

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

        <DetailImage src={dummyImageSrc} alt={name} />

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
      </React.Fragment>
    );
  }
}

export default detailWrapped(SectionDetails);
