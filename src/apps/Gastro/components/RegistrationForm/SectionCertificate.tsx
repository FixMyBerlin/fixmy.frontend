import React, { useEffect, useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { SimpleFileUpload } from 'formik-material-ui';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { AnchorButton } from '~/components2/Button';

import FormError from './FormError';
import config from '../../config';
import api from '../../api';
import logger from '~/utils/logger';

const FileInputLabel = styled.label`
  // Separate button and label
  a {
    margin-top: 1em;
  }

  // Hide original form element (it's uggo)
  div:last-child {
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
`;

const SectionCertificate = ({
  isSubmitting,
  values,
  district,
  handleChange
}) => {
  const [isSubmittingCertificate, setSubmittingCertificate] = useState(
    isSubmitting
  );

  useEffect(() => {
    const doSubmit = async () => {
      setSubmittingCertificate(true);

      let resp;
      try {
        resp = await api.uploadCertificate(values, district);
        handleChange({ target: { name: 'certificateS3', value: resp?.path } });
      } catch (e) {
        logger(e);
      }
      setSubmittingCertificate(false);
    };
    doSubmit();
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
          >
            Foto oder PDF auswählen
          </AnchorButton>

          {isSubmittingCertificate && <CircularProgress />}
        </ButtonWrapper>

        {values.certificate != null && (
          <SelectedFile>
            Datei gewählt: {values.certificate?.name}{' '}
          </SelectedFile>
        )}

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
            capture: 'environment'
          }}
        />
      </FileInputLabel>
    </section>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(SectionCertificate);
