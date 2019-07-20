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
import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';
import SidwalkBgImage from '~/images/reports/bikestand-placement-sidewalk.jpg';
import StreetBgImage from '~/images/reports/bikestand-placement-street.jpg';

// TODO: Move styled components to extra file(s) to not bloat up the file
// TODO: scroll to bottom when radio button in first group has been checked

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

const LightQuestion = styled(Question)`
  font-weight: 300;
  margin-bottom: 32px;
`;

const Explanation = styled(Paragraph)`
  margin-top: 0;
  margin-bottom: 25px;
`;

const StyledRadioButtonLabel = styled.label`
   font-size: 14px;
   line-height: 1.4;
   color: ${config.colors.darkgrey};
   align-self: flex-start;
   cursor: pointer;
`;

const StyledRadioButton = styled.input`
  cursor: pointer;
  margin-right: 12px;
  display: inline-block;
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

const BikestandPlacementRadioButton = styled(StyledRadioButton)`
    margin: 8px auto;
`;

const CostSlider = styled(RangeSlider)`
  &&  .rangeslider__fill {
     background-color: ${config.colors.lightgrey};
   }
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
      bikestandsPlacement: null,
      chargedBikeParkConceivable: null,
      paymentReservesBikePark: 1
    };
  }

  submit = () => {
    // marshall form data before submit
    const stateToSubmit = { ...this.state };
    if (!stateToSubmit.chargedBikeParkConceivable) {
      stateToSubmit.paymentReservesBikePark = 0;
    }
    delete stateToSubmit.chargedBikeParkConceivable;

    this.props.onConfirm(stateToSubmit);
  };

  isSubmittable = () => (
    this.state.bikestandsNeeded &&
    this.state.bikestandsPlacement !== null &&
    this.state.chargedBikeParkConceivable !== null
  )

  render() {
    return (
      <Wrapper>

        <Question>Wie viele Bügel werden benötigt?</Question>
        <RangeSlider
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


        <HorizontalRuler />

        <LightQuestion>Würdest du an dieser Stelle auch ein kostenpflichtiges Fahrradparkhaus nutzen?</LightQuestion>


        <StyledRadioButtonLabel htmlFor="charged-bikepark-conceivable" style={{ alignSelf: 'flex-start' }}>
          <StyledRadioButton
            type="radio"
            id="charged-bikepark-conceivable"
            name="charged-bikepark-conceivable"
            value="true"
            checked={!!this.state.chargedBikeParkConceivable}
            onChange={() => this.setState({ chargedBikeParkConceivable: true })}
          />
          {this.state.chargedBikeParkConceivable ?
          `Ja klar, und ich würde dafür ${this.state.paymentReservesBikePark}€ am Tag zahlen.` :
          'Ja klar!'
        }
        </StyledRadioButtonLabel>

        {this.state.chargedBikeParkConceivable && (
        <CostSlider
          min={0}
          max={5}
          name="paymentReservesBikePark"
          labels={{ 0: '0 €', 5: '5 €' }}
          value={this.state.paymentReservesBikePark}
          tooltip={false}
          handleLabel={`${this.state.paymentReservesBikePark} €`}
          onChange={paymentReservesBikePark => this.setState({ paymentReservesBikePark })}
        />
        )}

        <StyledRadioButtonLabel htmlFor="charged-bikepark-noz-conceivable" style={{ marginTop: 18 }}>
          <StyledRadioButton
            type="radio"
            id="charged-bikepark-noz-conceivable"
            name="charged-bikepark-conceivable"
            value="false"
            checked={this.state.chargedBikeParkConceivable === false}
            onChange={() => this.setState({ chargedBikeParkConceivable: false })}
          />
          Nein, so etwas brauche ich nicht.
        </StyledRadioButtonLabel>

        <WeiterButton
          onClick={this.submit}
          disabled={!this.isSubmittable()}
        >Weiter
        </WeiterButton>

      </Wrapper>
    );
  }
}

export default BikestandsForm;
