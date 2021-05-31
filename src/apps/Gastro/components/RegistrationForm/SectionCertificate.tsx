import { CircularProgress, FormHelperText } from '@material-ui/core';
import debug from 'debug';
import { ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { AnchorButton } from '~/components2/Button';

import api from '../../api';
import config from '../../config';
import FormError from '../FormError';

const logger = debug('fmc:Gastro:Registration');

const FileInputLabel = styled.label`
  // Separate button and label
  a {
    margin-top: 1em;
  }

  // Hide original form element (it's uggo)
  & > div:last-child {
    display: none;
  }
`;

const SelectedFile = styled.span`
  color: ${config.colors.change_4};
  font-weight: bold;
  display: block;
  margin-top: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    margin-right: 1em;
  }
`;

const UploadError = styled(FormHelperText)`
  && {
    font-size: 1em;
    line-height: 1.5;
    margin-top: 1em;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const SectionCertificate = ({
  isSubmitting,
  values,
  district,
  handleChange,
}) => {
  const [isSubmittingCertificate, setSubmittingCertificate] = useState<boolean>(
    isSubmitting
  );
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    const doSubmit = async () => {
      setSubmittingCertificate(true);
      setUploadError(null);

      let resp;
      try {
        resp = await api.uploadCertificate(values, district);
        handleChange({ target: { name: 'certificateS3', value: resp?.path } });
      } catch (e) {
        logger(e);
        setUploadError(
          'Das Hochladen Ihrer Gewerbeanmeldung / Ihres Vereinsregisters ist fehlgeschlagen. Bitte prüfen Sie Ihre Internetverbindung und versuchen es erneut.'
        );
        throw e;
      }
      setSubmittingCertificate(false);
    };
    if (values.certificate != null) doSubmit();
  }, [values.certificate?.name]);

  return (
    <section>
      <p>
        <strong>
          Bitte laden Sie hier die erste Seite Ihrer Gewerbeanmeldung / Ihres
          Vereinsregisters hoch.
        </strong>
      </p>
      <FileInputLabel>
        <div>
          Bitte wählen Sie eine PDF-Datei aus. Wenn Ihnen das Dokument nicht als
          PDF-Datei zur Verfügung steht schicken Sie bitte eine E-Mail mit einem
          Foto des Dokuments an{' '}
          <a href="mailto:aufsicht.sga@ba-fk.berlin.de">
            aufsicht.sga@ba-fk.berlin.de
          </a>
          . Beachten Sie in diesem Fall, dass die Schrift lesbar sein muss.
        </div>
        <ButtonWrapper>
          <AnchorButton
            flat
            disabled={isSubmitting || isSubmittingCertificate}
            aria-hidden="true"
            ghost={values.certificateS3 != null}
          >
            {values.certificateS3 == null && <>PDF auswählen</>}
            {values.certificateS3 != null && <>Neues PDF auswählen</>}
          </AnchorButton>
          {isSubmittingCertificate && <CircularProgress />}
        </ButtonWrapper>

        {values.certificateS3 != null && (
          <SelectedFile>
            Die gewählte Datei wurde Ihrem Antrag beigefügt.
          </SelectedFile>
        )}

        {uploadError && <UploadError error>{uploadError}</UploadError>}

        <ErrorMessage
          name="certificateS3"
          render={(msg) => <FormError error>{msg}</FormError>}
        />

        <HiddenInput
          type="file"
          name="certificate"
          accept=".pdf"
          onChange={({ currentTarget: { files } }) =>
            handleChange({ target: { name: 'certificate', value: files[0] } })
          }
        />
      </FileInputLabel>
    </section>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(SectionCertificate);
