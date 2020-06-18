import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { SimpleFileUpload } from 'formik-material-ui';
import styled from 'styled-components';

import { AnchorButton } from '~/components2/Button';

import FormError from './FormError';
import config from '../../config';

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

const SectionCertificate = ({ isSubmitting, values }) => (
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
      <AnchorButton flat disabled={isSubmitting} aria-hidden="true">
        Foto oder PDF auswählen
      </AnchorButton>

      {values.certificate != null && (
        <SelectedFile>Datei gewählt: {values.certificate?.name} </SelectedFile>
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

export default SectionCertificate;
