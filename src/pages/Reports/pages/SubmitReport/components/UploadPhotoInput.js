import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import PhotoControlImage from '~/images/reports/photo-control.png';

const PhotoInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: 1;
`;

const PhotoInputImageLabel = styled.label`
  margin-top: 42px;
  display: block;
  height: 83px;
  width: 109px;
  background-image: url(${PhotoControlImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;

  &.has-photo {
    max-width: 218px;
    max-height: 166px;
    width: 100vw;
    height: 100vh;
  }
`;

const PhotoInputLabel = styled.label`
  font-weight: bold;
  display: block;
  margin-top: 12px;
  font-size: 14px;
  color: ${config.colors.darkgrey};
`;

class UploadPhotoInput extends PureComponent {
  static propTypes = {
    onPhotoResized: PropTypes.func.isRequired,
    onError: PropTypes.func,
    resizeOptions: PropTypes.shape({
      maxWidth: PropTypes.number,
      maxHeight: PropTypes.number,
      quality: PropTypes.number
    })
  };

  static defaultProps = {
    onError: () => {},
    resizeOptions: {
      maxWidth: 800,
      maxHeight: 800,
      quality: 0.9
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      photo: null
    };
    this.fileReader = new FileReader();
    this.fileReader.onload = this.handleConvertedPhoto.bind(this);
  }

  onImageFileSelect = (fileList) => {
    const photo = fileList[0];
    if (!['image/jpg', 'image/jpeg'].includes(photo.type)) {
      this.props.onError('Sorry! Nur Fotos im Format JPG werden unterstützt.');
      return;
    }
    // trigger handleConvertedPhoto()
    this.fileReader.readAsDataURL(photo);
  };

  resizeImage = dataUrl => new Promise(((resolve) => {
      const image = new Image();
      image.src = dataUrl;
      image.onload = this.resizeImageInner.bind(this, image, dataUrl, resolve);
    }))

  resizeImageInner = (image, photoDataUrl, resolve) => {
    const { maxWidth, maxHeight, quality } = this.props.resizeOptions;
    const { width, height } = image;

    const shouldResize = (width > maxWidth) || (height > maxHeight);

    if (!shouldResize) {
      resolve(photoDataUrl);
    }

    let newWidth;
    let newHeight;

    if (width > height) {
      newHeight = height * (maxWidth / width);
      newWidth = maxWidth;
    } else {
      newWidth = width * (maxHeight / height);
      newHeight = maxHeight;
    }

    const canvas = document.createElement('canvas');

    canvas.width = newWidth;
    canvas.height = newHeight;

    const context = canvas.getContext('2d');

    context.drawImage(image, 0, 0, newWidth, newHeight);

    resolve(canvas.toDataURL('image/jpeg', quality));
  }

  handleConvertedPhoto(evt) {
    const photoInBase64 = evt.target.result;
    this.resizeImage(photoInBase64)
      .then((photo) => {
        // update state for UI update
        this.setState({ photo });
        // pass photo to container
        this.props.onPhotoResized(photo);
      });
  }

  render() {
    return (
      <Fragment>

        <PhotoInputImageLabel
          htmlFor="photo-file-input"
          style={{ backgroundImage: `url(${this.state.photo || PhotoControlImage})` }}
          className={this.state.photo ? 'has-photo' : ''}
        >
          <PhotoInput
            type="file"
            accept="image/*"
            capture="environment"
            id="photo-file-input"
            name="photo-file-input"
            onChange={e => this.onImageFileSelect(e.target.files)}
          />
        </PhotoInputImageLabel>
        <PhotoInputLabel
          htmlFor="photo-file-input"
        >
          {`Foto ${this.state.photo ? 'neu' : ''} aufnehmen oder hochladen`}
        </PhotoInputLabel>

      </Fragment>
    );
  }
}


export default UploadPhotoInput;
