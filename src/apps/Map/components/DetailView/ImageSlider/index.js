/* eslint react/no-array-index-key: 0 */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

import config from '~/config';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const dotSize = '10px';
const StyledSlider = styled(Slider)`
  background: white;
  min-height: 150px;

  .slick-slide {
    > div {
      height: 100%;
    }
  }

  .slick-dots {
    bottom: 16px;

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

const Slide = styled.div`
  width: 100%;
  position: relative;
  height: 100%;

  &:focus {
    outline: none;
  }
`;

const SliderImage = styled.img`
  width: 100%;

  &:focus {
    outline: none;
  }
`;

const ImageSource = styled.div`
  position: absolute;
  bottom: 2px;
  font-size: 9px;
  right: 2px;
  color: ${config.colors.lightgrey};
`;

const PlaceholderLabel = styled.div`
  position: absolute;
  left: 0;
  top: 40%;
  color: white;
  width: 100%;
  text-align: center;
`;

function renderImage(image) {
  const showPlaceholderLabel =
    image.src.includes('Platzhalter') || image.src.includes('emil-bruckner');
  return (
    <Slide key={`SliderImage_${image.src}`}>
      <SliderImage src={image.src} alt={image.copyright} />
      {showPlaceholderLabel && (
        <PlaceholderLabel>Noch kein Bild vorhanden</PlaceholderLabel>
      )}
      {image.copyright && <ImageSource>{image.copyright}</ImageSource>}
    </Slide>
  );
}

class ImageSlider extends PureComponent {
  render() {
    return (
      <StyledSlider dots arrows={false}>
        {this.props.images.map(renderImage)}
      </StyledSlider>
    );
  }
}

ImageSlider.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  images: PropTypes.arrayOf(PropTypes.object),
};

ImageSlider.defaultProps = {
  images: [],
};

export default ImageSlider;
