import { ErrorMessage, Field } from 'formik';
import { CheckboxWithLabel } from 'formik-material-ui';
import React from 'react';

import FormError from '../FormError';

const SectionUsage = () => (
  <section>
    <Field
      component={CheckboxWithLabel}
      name="tos_accepted"
      type="checkbox"
      Label={{
        label: (
          <span>
            Ich habe die{' '}
            <a
              href="/datenschutz"
              target="_blank"
              rel="noreferrer nofollow"
              className="internal"
            >
              Datenschutzvereinbarung
            </a>{' '}
            gelesen und willige in die Speicherung meiner Daten zur
            Kommunikation im Zuge der Nutzung der Xhain-Terrassen ein.
          </span>
        ),
      }}
    />
    <ErrorMessage
      name="tos_accepted"
      render={(msg) => <FormError error>{msg}</FormError>}
    />
  </section>
);

export default SectionUsage;
