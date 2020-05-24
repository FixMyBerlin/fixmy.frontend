import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { oneLine } from 'common-tags';
import TextareaAutosize from 'react-autosize-textarea';

import { number, func, shape, string } from 'prop-types';
import config from '~/pages/Reports/config';
import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import WeiterButton from '~/pages/Reports/pages/SubmitReport/components/WeiterButton';
import UploadPhotoInput from '~/pages/Reports/pages/SubmitReport/components/UploadPhotoInput';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import ErrorMessage from '~/components/ErrorMessage';
import { matchMediaSize, breakpoints } from '~/styles/utils';
import { actions as errorStateActions } from '~/pages/Reports/state/ErrorState';

const StyledHeading = styled(Heading)`
  margin: 0;
`;

const Hint = styled(Paragraph)`
  margin-top: 0.8em;
  margin-bottom: 0;
  font-weight: ${({ emphasize }) => (emphasize ? 'bold' : 'normal')};
`;

const HintBottom = styled(Hint)`
  margin-top: 2em;
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
  color: ${(props) => (props.disabled ? '#777' : config.colors.darkgrey)};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
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
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      photoDisclaimerTicked: false,
      description: ''
    };
  }

  onPhotoUpload = (photo) => this.setState({ photo });

  onPhotoDelete = () =>
    this.setState({ photo: null, photoDisclaimerTicked: false });

  onPhotoUploadError = (message) => {
    this.props.addError({ message });
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
    this.setState((prevState) => ({
      photoDisclaimerTicked: !prevState.photoDisclaimerTicked
    }));
  };

  updateDescription = (evt) => {
    this.setState({ description: evt.target.value });
  };

  render() {
    const isDesktopView = matchMediaSize(breakpoints.m);
    const isSubmittable = this.isSubmittable();
    const { maxDescriptionLength } = this.props;

    return (
      <DialogStepWrapper>
        <StyledHeading>
          Bitte entweder noch ein Foto von dem Ort oder Hinweise zum Ort
          ergänzen.
        </StyledHeading>
        <Hint>
          Ein Foto des Ortes hilft uns, die Situation vor Ort besser zu
          beurteilen und die Meldung schneller zu bearbeiten.
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
            Hiermit bestätige ich, dass auf den von mir eingestellten Fotos
            keine Personen abgebildet sind.
          </StyledCheckboxLabel>
        </PhotoDisclaimerWrapper>

        <StyledHeading>Hinweise zum Ort</StyledHeading>

        <DescriptionTextArea
          rows={isDesktopView ? 6 : 8}
          maxLength={maxDescriptionLength}
          value={this.state.description}
          onChange={this.updateDescription}
          data-cy="reports-additional-comment"
          placeholder={oneLine`
          Beschreiben Sie hier die Situation an dem Ort Ihrer
          Meldung oder nennen besondere Anforderungen,
          z.B. Stellplätze für Lastenräder, die Nähe einer Kita oder ähnliches.`}
        />
        <Hint
          emphasize={this.state.description.length === maxDescriptionLength}
        >
          Max. {maxDescriptionLength} Zeichen
        </Hint>

        <WeiterButton
          onClick={this.submit}
          disabled={!isSubmittable}
          data-cy="reports-additional-continue"
        >
          Weiter
        </WeiterButton>

        {!isSubmittable && (
          <HintBottom>
            <em>* Foto oder Text zum Fortfahren benötigt</em>
          </HintBottom>
        )}

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

AdditionalDataForm.propTypes = {
  onConfirm: func.isRequired,
  maxDescriptionLength: number,
  error: shape({ message: string }),
  addError: func.isRequired,
  removeError: func.isRequired
};

AdditionalDataForm.defaultProps = {
  maxDescriptionLength: 400,
  error: null
};

export default connect((state) => ({ error: state.ReportsState.ErrorState }), {
  ...errorStateActions
})(AdditionalDataForm);
