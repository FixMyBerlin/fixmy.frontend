import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// include the default range slider styles
import 'react-rangeslider/lib/index.css';

import { BIKESTAND_PLACEMENT_SIDEWALK, BIKESTAND_PLACEMENT_STREET } from '~/pages/Reports/ReportsState';
import RangeSlider from '~/components/RangeSlider';
import WeiterButton from '~/pages/Reports/pages/SubmitReport/components/WeiterButton';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import { RadioButton } from '~/pages/Reports/pages/SubmitReport/components/RadioButton';
import SidwalkBgImage from '~/images/reports/bikestand-placement-sidewalk.jpg';
import StreetBgImage from '~/images/reports/bikestand-placement-street.jpg';


const Wrapper = styled.div`
  padding: 11px;
  width: 100%;
  max-width: 568px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Question = styled(Heading)`
  margin-top: 32px;
  margin-bottom: 8px;
  line-height: 1.37;
`;

const BikeStandsSlider = styled(RangeSlider)`
  margin-bottom: 90px !important;
`;

const Explanation = styled(Paragraph)`
  margin-top: 0;
  margin-bottom: 25px;
`;

const BikestandPlacementContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const BikestandPlacementItem = styled.div`
  display: flex;
  width: 46%;
  height: auto;
  flex-direction: column;
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #353535;
`;

const BikestandPlacementLabel = styled.label`
  display: block;
`;

const BikestandPlacementImage = styled.img`
  border-radius: 6px;
  border: solid 1.5px ${config.colors.interaction};
  background-size: contain;
  margin-bottom: 10px;
  width: 100%;

  &:not(.picked) {
     filter: grayscale(100%);
  }

  &:hover {
    box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
    transition: box-shadow 0.4s ease-in;
  }
`;

const BikestandPlacementRadioButton = styled(RadioButton)`
    margin: 8px auto;
`;

class BikestandsForm extends PureComponent {
  static propTypes = {
    onConfirm: PropTypes.func
  };

  static defaultProps = {
    onConfirm: () => console.log('onConfirm() says implement me')
  };

  constructor(props) {
    super(props);
    this.state = {
      bikestandsNeeded: 0,
      bikestandsPlacement: null
    };
  }

  isSubmittable = () => (
    this.state.bikestandsNeeded &&
    this.state.bikestandsPlacement !== null
  )

  render() {
    return (
      <Wrapper>

        <Question>Wie viele Bügel werden benötigt?</Question>
        <BikeStandsSlider
          min={1}
          max={20}
          labels={{ 1: 1, 20: 20 }}
          name="bikestandsNeeded"
          value={this.state.bikestandsNeeded}
          tooltip={false}
          handleLabel={this.state.bikestandsNeeded.toString()}
          onChange={bikestandsNeeded => this.setState({ bikestandsNeeded })}
        />

        {/* // FIXME: add margin here */}


        <Question>..und wo könnten diese aufgestellt werden?</Question>
        <Explanation>Ein Bügel benötigt ungefähr 2 qm Fläche</Explanation>

        <BikestandPlacementContainer>
          <BikestandPlacementItem>
            <BikestandPlacementLabel
              htmlFor="amenityPlacement-sidewalk"
            >
              <BikestandPlacementImage
                src={SidwalkBgImage}
                className={this.state.bikestandsPlacement === BIKESTAND_PLACEMENT_SIDEWALK ? 'picked' : ''}
              />
            </BikestandPlacementLabel>
            Auf dem Gehweg
            <BikestandPlacementRadioButton
              type="radio"
              id="amenityPlacement-sidewalk"
              name="amenity-placement"
              value={BIKESTAND_PLACEMENT_SIDEWALK}
              checked={this.state.bikestandsPlacement === BIKESTAND_PLACEMENT_SIDEWALK}
              onChange={() => this.setState({ bikestandsPlacement: BIKESTAND_PLACEMENT_SIDEWALK })}
            />
          </BikestandPlacementItem>

          <BikestandPlacementItem>
            <BikestandPlacementLabel
              htmlFor="amenityPlacement-street"
            >
              <BikestandPlacementImage
                src={StreetBgImage}
                className={this.state.bikestandsPlacement === BIKESTAND_PLACEMENT_STREET ? 'picked' : ''}
              />
            </BikestandPlacementLabel>
            Auf der Straße
            <BikestandPlacementRadioButton
              type="radio"
              id="amenityPlacement-street"
              name="amenity-placement"
              value={BIKESTAND_PLACEMENT_STREET}
              checked={this.state.bikestandsPlacement === BIKESTAND_PLACEMENT_STREET}
              onChange={() => this.setState({ bikestandsPlacement: BIKESTAND_PLACEMENT_STREET })}
            />
          </BikestandPlacementItem>

        </BikestandPlacementContainer>

        <WeiterButton
          onClick={() => this.props.onConfirm(this.state)}
          disabled={!this.isSubmittable()}
        >Weiter
        </WeiterButton>

      </Wrapper>
    );
  }
}

export default BikestandsForm;
