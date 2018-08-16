/* eslint react/no-array-index-key: 0 */
import React, { PureComponent } from 'react';
import Styled from 'styled-components';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const dotSize = '10px';
const StyledSlider = Styled(Slider)`
  background: white;
  min-height: 100px;

  .slick-dots {
    bottom: 5px;

    li {
      width: ${dotSize};
    }

    button {
      background: #fff;
      border-radius: 50%;
      width: ${dotSize};
      height: ${dotSize};

      &:before {
        width: ${dotSize};
        line-height: ${dotSize};
      }
    }
  }
`;

const Slide = Styled.div`
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const SliderImage = Styled.img`
  width: 100%;

  &:focus {
    outline: none;
  }
`;

class ImageSlider extends PureComponent {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object)
  }

  static defaultProps = {
    images: []
  }

  render() {
    return (
      <StyledSlider
        dots
        arrows={false}
      >
        {this.props.images.map((image, i) => (
          <Slide key={`SliderImage_${i}`}>
            <SliderImage src={image.src} alt="" />
          </Slide>
        ))}
      </StyledSlider>
    );
  }
}

export default ImageSlider;
