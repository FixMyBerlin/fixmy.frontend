import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { SimpleFileUpload } from 'formik-material-ui';
import styled from 'styled-components';

import { AnchorButton } from '~/components2/Button';

import FormError from './FormError';

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
        (Schrift muss lesbar sein)
      </div>
      <AnchorButton flat disabled={isSubmitting} aria-hidden="true">
        {values.certificate == null ? (
          'Foto oder PDF auswählen'
        ) : (
          <span>
            <span role="img" aria-label="file">
              💾
            </span>{' '}
            {values.certificate?.name}
          </span>
        )}
      </AnchorButton>

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
