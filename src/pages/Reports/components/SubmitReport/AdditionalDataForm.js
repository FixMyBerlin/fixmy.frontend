import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PhotoControlImage from '~/images/reports/photo-control.png';

const Wrapper = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
`;

const Hint = styled.p`
  font-size: 14px;
  color: ${config.colors.darkgrey};
  line-height: 1.4;
`;

const PhotoInput = styled.input`
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`;

const PhotoInputLabel = styled.label`
  display: block;
  height: 83px;
  width: 109px;
  background-image: url(${PhotoControlImage});
  background-size: contain;
  cursor: pointer;
`;


// TODO: Factor out photo input
// TODO: checkout https://github.com/odysseyscience/react-s3-uploader for upload component


class AdditionalDataForm extends PureComponent {
  static propTypes = {
    onConfirm: PropTypes.func
  };

  static defaultProps = {
    onConfirm: () => console.log('onConfirm() says implement me')
  };

  constructor(props) {
    super(props);
    this.state = {
      photo: null
    };
    this.fileReader = new FileReader();
    this.fileReader.onload = this.photoConverted;
  }

  submit = () => {
    this.props.onConfirm(this.state);
  };

  photoTaken = (fileList) => {
    const photo = fileList[0];
    this.fileReader.readAsDataURL(photo);
  };

  photoConverted = (evt) => {
    const photoInBase64 = evt.target.result;
    this.setState({ photo: photoInBase64 });
  }

  render() {
    return (
      <Wrapper>
        <Heading>Hier kannst du noch ein Foto ergänzen</Heading>
        <PhotoInputLabel htmlFor="photo-file-input">
          <PhotoInput
            type="file"
            accept="image/*"
            capture="environment"
            id="photo-file-input"
            name="photo-file-input"
            onChange={e => this.photoTaken(e.target.files)}
          />
        </PhotoInputLabel>
        <Hint>Das hilft den Planer*innen die Situation vor Ort besser zu verstehen.</Hint>
        <Heading>…oder eine Beschreibung eingeben</Heading>

        <div>
          Photo Test
          {this.state.photo && (
            <img src={this.state.photo} />
          )}
        </div>

      </Wrapper>
    );
  }
}

export default AdditionalDataForm;
