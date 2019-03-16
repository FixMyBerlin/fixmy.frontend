import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { oneLine } from 'common-tags';
import TextareaAutosize from 'react-autosize-textarea';
import PhotoControlImage from '~/images/reports/photo-control.png';
import Button from '~/components/Button';
import { breakpoints } from '~/styles/utils';


const Wrapper = styled.div`
  padding: 32px 8px 72px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h3`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  color: ${config.colors.black};
  text-align: center;
`;

const Hint = styled.p`
  margin-top: 12px;
  margin-bottom: 0;
  font-size: 14px;
  color: ${config.colors.darkgrey};
  text-align: center;
  line-height: 1.4;
`;

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
  cursor: pointer;
`;

const PhotoInputLabel = styled.label`
  margin-top: 12px;
  font-size: 14px;
  color: ${config.colors.darkgrey};
`;

const PhotoDisclaimerWrapper = styled.div`
  margin-top: 82px;
  margin-bottom: 52px;
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
  margin-right: 12px;
  display: inline-block;
  transform: scale(1.5);
  transform-origin: top left;
  &&[disabled] {
    cursor: default;
  }
`;

const StyledCheckboxLabel = styled.label`
   font-size: 10px;
   letter-spacing: 0.2px;
   line-height: 1.4;
   color: ${config.colors.darkgrey};
   
   cursor: pointer;
`;

const DescriptionTextArea = styled(TextareaAutosize)`
  margin-top: 26px;
  width: 90%;
  max-width: ${breakpoints.s}px;
  font-size: 14px;
  padding: 8px;
  
  &:focus {
    outline-color: ${config.colors.interaction};
  }
`;

// TODO: D.R.Y. -> this is just copied from Ironingsform. Factor this out
const WeiterButton = styled(Button)`
  display: block;
  margin-top: 51px;
  height: 48px;
  width: 167px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
  
  &&[disabled] {
    background-color: ${config.colors.lightgrey};
    cursor: default;
    &:hover {
      opacity: 1;
    }
  }
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
      photo: null,
      photoDisclaimerTicked: false,
      description: ''
    };
    this.fileReader = new FileReader();
    this.fileReader.onload = this.handleConvertedPhoto;
  }

  submit = () => {
    // marshall form data before submit
    const stateToSubmit = { ...this.state };
    delete stateToSubmit.photoDisclaimerTicked;

    // TODO: when a photo has been taken but the disclaimer has not been ticked, show a (unintrusive) error hint

    this.props.onConfirm(this.state);
  };

  isSubmittable = () => (this.state.photo !== null && this.state.photoDisclaimerTicked) ||
      this.state.description.length;

  processTakenPhoto = (fileList) => {
    const photo = fileList[0];
    this.fileReader.readAsDataURL(photo);
  };

  handleConvertedPhoto = (evt) => {
    const photoInBase64 = evt.target.result;
    this.setState({ photo: photoInBase64 });
  };

  togglePhotoDisclaimerTicked = () => {
    this.setState(prevState => ({ photoDisclaimerTicked: !prevState.photoDisclaimerTicked }));
  };

  updateDescription = (evt) => {
    this.setState({ description: evt.target.value });
  };

  render() {
    return (
      <Wrapper>
        <Heading>Hier kannst du noch ein Foto ergänzen</Heading>
        <Hint>Das hilft den Planer*innen die Situation vor Ort besser zu verstehen.</Hint>
        <PhotoInputImageLabel
          htmlFor="photo-file-input"
          style={{ backgroundImage: `url(${this.state.photo || PhotoControlImage})` }}
        >
          <PhotoInput
            type="file"
            accept="image/*"
            capture="environment"
            id="photo-file-input"
            name="photo-file-input"
            onChange={e => this.processTakenPhoto(e.target.files)}
          />
        </PhotoInputImageLabel>
        <PhotoInputLabel>Foto aufnehmen</PhotoInputLabel>

        <PhotoDisclaimerWrapper>
          <StyledCheckboxLabel htmlFor="photo-disclaimer-tick" style={{ alignSelf: 'flex-start' }}>
            <StyledCheckbox
              type="checkbox"
              id="photo-disclaimer-tick"
              name="photo-disclaimer-tick"
              value="true"
              disabled={!this.state.photo}
              checked={this.state.photoDisclaimerTicked}
              onChange={this.togglePhotoDisclaimerTicked}
            />
            Hiermit bestätige, dich, dass auf den von mir eingestellten Fotos keine Personen abgebildet sind
          </StyledCheckboxLabel>
        </PhotoDisclaimerWrapper>

        <Heading>…oder eine Beschreibung eingeben</Heading>

        <DescriptionTextArea
          rows={4}
          maxRows={8}
          maxLength={140}
          value={this.state.description}
          onChange={this.updateDescription}
          placeholder={oneLine`z.B.: Vor dem Kindergarten ist morgens immer viel
        los besonders Stellplätze für Lastenräder wären hier wichtig. Platz wäre direkt an der Hauswand.`}
        />

        <WeiterButton
          onClick={this.submit}
          disabled={!this.isSubmittable()}
        >Weiter
        </WeiterButton>

      </Wrapper>
    );
  }
}

export default AdditionalDataForm;
