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
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
  text-align: center;
`;

const StyledSlider = styled(Slider)`

   && {
      height: 6px;
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
      amenityPlacement: null
    };
  }


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
            handleLabel={this.state.ironingsNeeded.toString()}
            onChange={ironingsNeeded => this.setState({ ironingsNeeded })}
          />
        </div>

        <Button onClick={this.props.onConfirm}>Weiter</Button>

      </Wrapper>


    );
  }
}

export default WhatsNeeded;
