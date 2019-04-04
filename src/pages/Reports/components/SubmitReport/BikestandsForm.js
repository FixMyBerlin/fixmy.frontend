import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css'; // include the default range slider styles
import Button from '~/components/Button';
import { breakpoints } from '~/styles/utils';
import { BIKESTAND_PLACEMENT_SIDEWALK, BIKESTAND_PLACEMENT_STREET } from '../../ReportsState';
import SidwalkBgImage from '~/images/reports/bikestand-placement-sidewalk.png';
import StreetBgImage from '~/images/reports/bikestand-placement-street.png';

// TODO: Move styled components to extra file(s) to not bloat up the file
// TODO: scroll to bottom when radio button in first group has been checked

const Wrapper = styled.div`
  padding: 11px;
  max-width: ${breakpoints.m}px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Question = styled.p`
  text-align: center;
  margin-top: 32px;
  margin-bottom: 8px;
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
`;

const LightQuestion = styled(Question)`
  font-weight: 300;
  margin-bottom: 32px;
`;

const Explanation = styled.p`
  margin-top: 0;
  margin-bottom: 52px;
  font-size: 14px;
  color: ${config.colors.darkgrey};
  line-height: 1.4;
`;

const WeiterButton = styled(Button)`
  display: block;
  margin-top: 84px;
  margin-bottom: 42px;
  height: 48px;
  width: 167px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
  
  &&[disabled] {
    background-color: ${config.colors.lightgrey};
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }
`;

// TODO: factor out, used multiple times in other places
const StyledHr = styled.hr`
  width: 100%;
  border: 0.5px dashed rgba(162, 162, 162, 0.87);
`;

const StyledSlider = styled(Slider)`

  width: 100%;
  max-width: ${breakpoints.s}px;

   && {
      height: 6px;
      margin-bottom: 72px;
      margin-top: 64px;
    }
  
   &&  .rangeslider__fill {
     background-color: ${config.colors.interaction};
   }
  
  && .rangeslider__handle {
     width: 48px;
     height: 48px;
     background-color: ${config.colors.interaction};
     border: none;
     box-shadow: 0 3px 4px rgba(0, 0, 0, 0.4);
     cursor: pointer;
     user-select: none;
     
     &:focus {
      outline: none;
     }
     
     &:after {
      content: none;
     }
  }
  
  && .rangeslider__handle-label {
    color: white;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    line-height: 48px;
    vertical-align: center;
  }
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
  max-width: 400px;
`;

const BikestandPlacementItem = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const BikestandPlacementImageLabel = styled.label`
  order: -1;
  height: 93px;
  width: 156.7px;
  border-radius: 6px;
  border: solid 1.5px ${config.colors.interaction};
  background-size: cover;
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center; /* align horizontal */
  align-items: center;
  
  &:not(.picked) {
     filter: grayscale(100%);
  }
  
  &:hover {
    filter: saturate(120%);
    box-shadow: inset 0 0 12px ${config.colors.interaction};
    transition: filter 0.4s ease-in, box-shadow 0.4s ease-in;
  }
`;

const BikestandPlacementRadioButton = styled(StyledRadioButton)`
    margin: 8px auto;
`;

const CostSlider = styled(StyledSlider)`
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
      bikestandsNeeded: 3,
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

  isSubmittable = () => this.state.bikestandsPlacement !== null && this.state.chargedBikeParkConceivable !== null;

  // TODO: use formik for standardized form validation
  // TODO: factor out formik-ified radio buttons (see https://codesandbox.io/s/pjqp3xxq7q?from-embed for how that works) for re-usage
  // TODO: target the UI quirk that images are loaded after the component is shown

  render() {
    return (
      <Wrapper>

        <Question>Wie viele Bügel werden benötigt?</Question>
        <StyledSlider
          min={1}
          max={20}
          name="bikestandsNeeded"
          value={this.state.bikestandsNeeded}
          tooltip={false}
          handleLabel={this.state.bikestandsNeeded.toString()}
          onChange={bikestandsNeeded => this.setState({ bikestandsNeeded })}
        />

        <Question>..und wo könnten diese aufgestellt werden?</Question>
        <Explanation>Ein Bügel benötigt ungefähr 2 qm Fläche</Explanation>

        <BikestandPlacementContainer>
          <BikestandPlacementItem>
            <BikestandPlacementImageLabel
              htmlFor="amenityPlacement-sidewalk"
              style={{ backgroundImage: `url(${SidwalkBgImage})` }}
              className={this.state.bikestandsPlacement === BIKESTAND_PLACEMENT_SIDEWALK ? 'picked' : ''}
            >
              Auf dem <br /> Gehweg
            </BikestandPlacementImageLabel>
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
            <BikestandPlacementImageLabel
              htmlFor="amenityPlacement-street"
              style={{ backgroundImage: `url(${StreetBgImage})` }}
              className={this.state.bikestandsPlacement === BIKESTAND_PLACEMENT_STREET ? 'picked' : ''}
            >
              Auf der Straße
            </BikestandPlacementImageLabel>
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


        <StyledHr />

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
