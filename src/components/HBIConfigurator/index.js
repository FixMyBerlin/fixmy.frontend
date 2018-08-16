import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import Store from '~/redux/store';
import { updateHBI } from '~/modules/User/UserState';
import Title from '~/components/styled/Title';
import Button from '~/components/styled/Button';

const MapContent = styled.div`
  width: 100%;
  background: #fff;
  flex: 0 1 auto;
`;

const MapContentBody = styled.div`
  width: 100%;
  padding: 12px 24px;
`;

const SliderLabel = styled.div`
  font-weight: 500;
  text-align: center;
  font-size: 14px;
  margin: .5em 0;
`;

const ModalHeadline = Title.extend`
  margin-top: 0;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  background: #f5f5f5;
  border-top: #979797;
  padding: 12px 24px;
  width: 100%;
  text-align: center;
`;

const StyledSlider = styled(Slider)`
  .rc-slider-rail {
    background: #999;
  }
  .rc-slider-handle {
    background: #cf0a7d;
    border: none;
    margin-left: -10px;
    margin-top: -8px;
    width: 20px;
    height: 20px;
    color: white;
    font-size: 12px;
    display: flex;
    line-height: 1;
    justify-content: center;
    align-items: center;
  }
`;

class HBIConfigurator extends PureComponent {
  static onSliderChange(index) {
    return value => Store.dispatch(updateHBI(index, value));
  }

  static renderHandle(props) {
    const { value, dragging, index, ...restProps } = props;

    return (
      <Slider.Handle value={value} {...restProps}>
        {props.value}
      </Slider.Handle>
    );
  }

  static renderSlider(d, i) {
    return (
      <div key={`hbi__slider_${d.type}`}>
        <SliderLabel>{d.label}</SliderLabel>
        <StyledSlider
          min={d.min}
          max={d.max}
          defaultValue={d.value}
          onChange={HBIConfigurator.onSliderChange(i)}
          included={false}
          handle={HBIConfigurator.renderHandle}
        />
      </div>
    );
  }

  render() {
    return (
      <MapContent>
        <MapContentBody>
          <ModalHeadline>My Happy-Bike-Level</ModalHeadline>
          {config.hbi.map(HBIConfigurator.renderSlider)}
        </MapContentBody>
        <ButtonWrapper>
          <Button onClick={this.props.onSave}>Speichern</Button>
        </ButtonWrapper>
      </MapContent>
    );
  }
}

export default HBIConfigurator;
