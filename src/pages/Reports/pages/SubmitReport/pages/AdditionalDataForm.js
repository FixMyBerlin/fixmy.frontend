import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { oneLine } from 'common-tags';
import TextareaAutosize from 'react-autosize-textarea';

import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import WeiterButton from '~/pages/Reports/pages/SubmitReport/components/WeiterButton';
import UploadPhotoInput from '~/pages/Reports/pages/SubmitReport/components/UploadPhotoInput';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import ErrorMessage from '~/pages/Reports/components/ErrorMessage';
import { matchMediaSize, breakpoints } from '~/styles/utils';
import {
  removeError,
  addError
} from '~/pages/Reports/ReportsState';

const StyledHeading = styled(Heading)`
  margin: 0;
`;

const Hint = styled(Paragraph)`
  margin-top: 12px;
  margin-bottom: 0;
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
  font-size: 16px;
  padding: 8px;

  &:focus {
    outline-color: ${config.colors.interaction};
  }
`;

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
  }

  onPhotoUpload = photo => this.setState({ photo })

  onPhotoUploadError = (errorMsg) => {
    const isDesktopView = matchMediaSize(breakpoints.m);
    this.props.addError(`Fehler beim ${isDesktopView ? 'hochladen' : 'aufnehmen'} des Fotos: 
    ${errorMsg}`);
  }

  submit = () => {
    // marshall form data before submit
    const stateToSubmit = { ...this.state };
    delete stateToSubmit.photoDisclaimerTicked;
    this.props.onConfirm(stateToSubmit);
  };

  isSubmittable = () => (this.state.photo !== null && this.state.photoDisclaimerTicked) ||
    this.state.description.length;

  togglePhotoDisclaimerTicked = () => {
    this.setState(prevState => ({ photoDisclaimerTicked: !prevState.photoDisclaimerTicked }));
  };

  updateDescription = (evt) => {
    this.setState({ description: evt.target.value });
  };

  render() {
    return (
      <DialogStepWrapper>
        <StyledHeading>Ein Foto des Ortes hilft den Planer:innen deine Meldung schneller zu bearbeiten.</StyledHeading>
        <Hint>Ein Foto des Ortes hilft den Planer:innen deine Meldung schneller zu bearbeiten.</Hint>

        <UploadPhotoInput
          resizeOptions={config.reports.dialog.imageResizeOptions}
          onPhotoResized={this.onPhotoUpload}
          onError={this.onPhotoUploadError}
        />

        <PhotoDisclaimerWrapper>
          <StyledCheckboxLabel htmlFor="photo-disclaimer-tick" style={{ alignSelf: 'flex-start' }}>
            <StyledCheckbox
              type="checkbox"
              id="photo-disclaimer-tick"
              name="photo-disclaimer-tick"
              value="true"
              disabled={!this.state.photo}
              className={this.state.photo && 'wiggle'}
              checked={this.state.photoDisclaimerTicked}
              onChange={this.togglePhotoDisclaimerTicked}
            />
            Hiermit bestätige ich, dass auf den von mir eingestellten Fotos keine Personen abgebildet sind
          </StyledCheckboxLabel>
        </PhotoDisclaimerWrapper>

        <StyledHeading>Beschreibung des Ortes eingeben</StyledHeading>

        <DescriptionTextArea
          rows={4}
          maxRows={8}
          maxLength={140}
          value={this.state.description}
          onChange={this.updateDescription}
          placeholder={oneLine`Vor dem Kindergarten ist morgens immer viel los. Besonders 
          Stellplätze für Lastenräder wären hier wichtig. Platz wäre direkt an der Hauswand.`}
        />

        <WeiterButton
          onClick={this.submit}
          disabled={!this.isSubmittable()}
        >Weiter
        </WeiterButton>

        {
          this.props.error.message && (
            <ErrorMessage
              message={this.props.error.message}
              onDismiss={this.props.removeError}
            />
          )
        }

      </DialogStepWrapper>
    );
  }
}

export default connect(
  state => ({ error: state.ReportsState.error }),
  { addError, removeError }
)(AdditionalDataForm);
