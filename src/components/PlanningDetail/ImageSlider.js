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

  .slick-slide {

    >div {
      height: 100%;
    }
  }

  .slick-dots {
    bottom: 10px;

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
  position: relative;
  height: 100%;

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

const ImageSource = Styled.div`
  position: absolute;
  bottom: 2px;
  font-size: 9px;
  right:2px;
  color: ${config.colors.lightgrey};
`;

const PlaceholderLabel = Styled.div`
  position: absolute;
  left: 0;
  top: 40%;
  color: white;
  width: 100%;
  text-align: center;
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
            <SliderImage src={image.src} alt={image.copyright} />
            {image.src.includes('Platzhalter') && <PlaceholderLabel>Noch kein Bild vorhanden</PlaceholderLabel>}
            {image.copyright && <ImageSource>{image.copyright}</ImageSource>}
          </Slide>
        ))}
      </StyledSlider>
    );
  }
}

export default ImageSlider;
