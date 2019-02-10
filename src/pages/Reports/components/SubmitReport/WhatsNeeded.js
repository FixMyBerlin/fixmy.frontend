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


class WhatsNeeded extends PureComponent {
  static propTypes = {
    onConfirm: PropTypes.func
  }

  static defaultProps = {
    onConfirm: () => console.log('onConfirm() says implement me')
  }

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
          <Slider
            min={0}
            max={20}
            name="ironingsNeeded"
            value={this.state.ironingsNeeded}
            onChange={ironingsNeeded => this.setState({ ironingsNeeded })}
          />
          <div className="value">{this.state.ironingsNeeded}</div>
        </div>

        <Button onClick={this.props.onConfirm}>Weiter</Button>

      </Wrapper>


    );
  }
}

export default WhatsNeeded;
