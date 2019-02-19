import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
// include the default range slider styles
import 'react-rangeslider/lib/index.css';
import Button from '~/components/Button';
import { breakpoints } from '~/styles/utils';

// TODO: customize sliders

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
  margin-top: 32px;
  margin-bottom: 8px;
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
`;

const Explanation = styled.p`
  margin-top: 0;
  font-size: 14px;
  color: ${config.colors.darkgrey};
  line-height: 1.4;
`;

const WeiterButton = styled(Button)`
  display: block;
  margin-top: 84px;
  height: 48px;
  width: 167px;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
`;

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
  // TODO: checkout this fiddle how radio buttons can be reactified and how form validation works https://codesandbox.io/s/pjqp3xxq7q?from-embed

  render() {
    return (
      <Wrapper>

        <Question>Wie viele Bügel werden benötigt?</Question>
        <StyledSlider
          min={0}
          max={20}
          name="ironingsNeeded"
          value={this.state.ironingsNeeded}
          tooltip={false}
          handleLabel={this.state.ironingsNeeded.toString()}
          onChange={ironingsNeeded => this.setState({ ironingsNeeded })}
        />

        <Question>..und wo könnten diese aufgestellt werden?</Question>
        <Explanation>Ein Bügel benötigt ungefähr 2 qm Fläche</Explanation>

        <div style={{ backgroundColor: 'rgba(162, 162, 162, 0.87)', height: 300, width: '100%', color: 'white' }}>Placeholder</div>

        <StyledHr />

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
