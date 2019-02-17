import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
// include the default range slider styles
import 'react-rangeslider/lib/index.css';
import Button from '~/components/Button';

// TODO: customize sliders

const Wrapper = styled.div`
  padding: 11px;
`;

const Question = styled.p`
  margin-top: 32px;
  margin-bottom: 8px;
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
  text-align: center;
`;

const Explaination = styled.p`
  margin-top: 0;
  font-size: 14px;
  color: ${config.colors.darkgrey};
  text-align: center;
  line-height: 1.4;
`;

const WeiterButton = styled(Button)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 84px;
  height: 48px;
  width: 167px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
`;


const StyledSlider = styled(Slider)`
    
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

const CostSlider = styled(StyledSlider)`
  &&  .rangeslider__fill {
     background-color: ${config.colors.lightgrey};
   }
`;


class WhatsNeeded extends PureComponent {
  static propTypes = {
    onConfirm: PropTypes.func
  };

  static defaultProps = {
    onConfirm: () => console.log('onConfirm() says implement me')
  };

  constructor(props) {
    super(props);
    this.state = {
      ironingsNeeded: 3,
      amenityPlacement: null,
      paymentReservesBikePark: 1
    };
  }

  // TODO: render the second slider only if the first option has been chosen
  // TODO: checkout this fiddle how radio buttons can be reactified

  render() {
    return (
      <Wrapper>

        <Question>Wie viele Bügel werden benötigt?</Question>
        <div className="slider">
          <StyledSlider
            min={0}
            max={20}
            name="ironingsNeeded"
            value={this.state.ironingsNeeded}
            tooltip={false}
            handleLabel={this.state.ironingsNeeded}
            onChange={ironingsNeeded => this.setState({ ironingsNeeded })}
          />
        </div>

        <Question>..und wo könnten diese aufgestellt werden?</Question>
        <Explaination>Ein Bügel benötigt ungefähr 2 qm Fläche</Explaination>


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

        <WeiterButton onClick={this.props.onConfirm}>Weiter</WeiterButton>

      </Wrapper>


    );
  }
}

export default WhatsNeeded;
