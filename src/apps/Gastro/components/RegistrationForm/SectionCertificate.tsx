import { CircularProgress, FormHelperText } from '@material-ui/core';
import debug from 'debug';
import { Field, ErrorMessage } from 'formik';
import { SimpleFileUpload } from 'formik-material-ui';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { AnchorButton } from '~/components2/Button';

import api from '../../api';
import config from '../../config';
import FormError from './FormError';

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
          Wählen Sie eine PDF- oder Bilddatei aus oder machen Sie ein Foto
          (Schrift muss lesbar sein).
        </div>
        <ButtonWrapper>
          <AnchorButton
            flat
            disabled={isSubmitting || isSubmittingCertificate}
            aria-hidden="true"
            ghost={values.certificateS3 != null}
          >
            {values.certificateS3 == null && <>Foto oder PDF auswählen</>}
            {values.certificateS3 != null && <>Neues Foto oder PDF auswählen</>}
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
          name="certificate"
          render={(msg) => <FormError error>{msg}</FormError>}
        />

        <Field
          component={SimpleFileUpload}
          name="certificate"
          type="file"
          inputProps={{
            accept: 'image/*,application/pdf,application/vnd.ms-excel',
            capture: 'environment',
          }}
        />
      </FileInputLabel>
    </section>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(SectionCertificate);
