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
import { actions as errorStateActions } from "~/pages/Reports/state/ErrorState";

const StyledHeading = styled(Heading)`
  margin: 0;
`;

const Hint = styled(Paragraph)`
  margin-top: 12px;
  margin-bottom: 0;
  font-weight: ${({ emphasize }) => (emphasize ? 'bold' : 'normal')}
`;

const PhotoDisclaimerWrapper = styled.div`
  margin: 42px 14px 90px;
  display: flex;
`;

const StyledCheckbox = styled.input`
  cursor: pointer;
  margin-right: 12px;
  display: block;
  transform: scale(1.5);
  transform-origin: top left;

  &&[disabled] {
    cursor: default;
  }
`;

const StyledCheckboxLabel = styled.label`
   font-size: 12px;
   letter-spacing: 0.2px;
   line-height: 1.4;
   color: ${props => (props.disabled ? '#777' : config.colors.darkgrey)};
   cursor: ${props => (props.disabled ? 'default' : 'pointer')};
   display: block;
`;

const PLACEHOLDER_COLOR = config.colors.midgrey;

const DescriptionTextArea = styled(TextareaAutosize)`
  margin-top: 26px;
  width: 90%;
  max-width: ${breakpoints.s}px;
  font-size: 16px;
  padding: 8px;

  &&::placeholder {
    color: ${PLACEHOLDER_COLOR};
  }

  &:focus {
    outline-color: ${config.colors.interaction};
  }
`;

class AdditionalDataForm extends PureComponent {
  static propTypes = {
    onConfirm: PropTypes.func,
    maxDescriptionLength: PropTypes.number
  };

  static defaultProps = {
    onConfirm: () => console.log('onConfirm() says implement me'),
    maxDescriptionLength: 400
  };

  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      photoDisclaimerTicked: false,
      description: ''
    };
  }

  onPhotoUpload = photo => this.setState({ photo });

  onPhotoDelete = () => this.setState({ photo: null, photoDisclaimerTicked: false });

  onPhotoUploadError = (errorMsg) => {
    const isDesktopView = matchMediaSize(breakpoints.m);
    this.props.addError(`Fehler beim ${isDesktopView ? 'hochladen' : 'aufnehmen'} des Fotos:
    ${errorMsg}`);
  };

  submit = () => {
    // marshall form data before submit
    const stateToSubmit = { ...this.state };
    delete stateToSubmit.photoDisclaimerTicked;
    this.props.onConfirm(stateToSubmit);
  };

  isSubmittable = () => {
    let isSubmittable;
    const { photo, photoDisclaimerTicked, description } = this.state;

    isSubmittable = photo || description;

    if (photo && !photoDisclaimerTicked) {
      isSubmittable = false;
    }
    return isSubmittable;
  };

  togglePhotoDisclaimerTicked = () => {
    this.setState(prevState => ({ photoDisclaimerTicked: !prevState.photoDisclaimerTicked }));
  };

  updateDescription = (evt) => {
    this.setState({ description: evt.target.value });
  };

  render() {
    const isDesktopView = matchMediaSize(breakpoints.m);

    return (
      <DialogStepWrapper>
        <StyledHeading>Bitte entweder noch ein Foto von dem Ort oder Hinweise zum Ort ergänzen.</StyledHeading>
        <Hint>
          Ein Foto des Ortes hilft der Verwaltung, die Situation vor Ort besser zu beurteilen und die Meldung schneller zu bearbeiten.
        </Hint>

        <UploadPhotoInput
          resizeOptions={config.reports.dialog.imageResizeOptions}
          onPhotoResized={this.onPhotoUpload}
          onError={this.onPhotoUploadError}
          onReset={this.onPhotoDelete}
        />

        <PhotoDisclaimerWrapper>
          <StyledCheckbox
            type="checkbox"
            id="photo-disclaimer-tick"
            name="photo-disclaimer-tick"
            disabled={!this.state.photo}
            className={this.state.photo && 'wiggle'}
            checked={this.state.photoDisclaimerTicked}
            onChange={this.togglePhotoDisclaimerTicked}
          />
          <StyledCheckboxLabel
            htmlFor="photo-disclaimer-tick"
            disabled={!this.state.photo}
          >
            Hiermit bestätige ich, dass auf den von mir eingestellten Fotos keine Personen abgebildet sind.
          </StyledCheckboxLabel>
        </PhotoDisclaimerWrapper>

        <StyledHeading>Hinweise an die Verwaltung</StyledHeading>

        <DescriptionTextArea
          rows={isDesktopView ? 6 : 8}
          maxLength={this.props.maxDescriptionLength}
          value={this.state.description}
          onChange={this.updateDescription}
          placeholder={oneLine`
          Beschreibe hier die Situation an dem Ort deiner
          Meldung oder nenne besondere Anforderungen,
          z.B. Stellplätze für Lastenräder, die Nähe einer Kita oder Ähnliches.`}
        />
        <Hint emphasize={this.state.description.length === this.props.maxDescriptionLength}>Max. {this.props.maxDescriptionLength} Zeichen</Hint>

        <WeiterButton
          onClick={this.submit}
          disabled={!this.isSubmittable()}
        >
          Weiter
        </WeiterButton>

        {this.props.error.message && (
          <ErrorMessage
            message={this.props.error.message}
            onDismiss={this.props.removeError}
          />
        )}
      </DialogStepWrapper>
    );
  }
}

export default connect(
  state => ({ error: state.ReportsState.ErrorState }),
  { errorStateActions }
)(AdditionalDataForm);
