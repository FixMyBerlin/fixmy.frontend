import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import fetch from 'unfetch';
import { trackEvent } from '~/general/utils';

import Title from '~/components/Title';
import Button from '~/components/Button';
import Form from '~/components/Form';
import FormField from '~/components/FormField';

import formConfig, { initialValues } from './config';

// we need to set all unset values to null in order to satisfy the server
function cleanupFormValues(values) {
  return Object.keys(values).reduce((res, key) => {
    res[key] = values[key] === '' ? null : values[key];
    return res;
  }, {});
}

class HBISubmitForm extends PureComponent {
  onSubmit = (values, { setSubmitting, setErrors }) => {
    const cleanValues = cleanupFormValues(values);

    fetch(`${config.apiUrl}/profiles/${this.props.userid}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...cleanValues, id: this.props.userid })
    })
      .then(() => {
        setSubmitting(false);
        trackEvent('my-hbi', 'save-profile', 'details');
        this.props.onClose();
      })
      .catch(() => {
        setSubmitting(false);
        setErrors({ server: 'Es gab ein Problem mit dem Server. Bitte versuche es noch ein mal.' });
      });
  }

  render() {
    return (
      <div>
        <Title>Profil speichern</Title>
        <Formik
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          render={({
            values,
            errors,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              {formConfig.map(d => (
                <FormField
                  key={`hbifield__${d.id}`}
                  {...d}
                  values={values}
                  errors={errors}
                />
              ))}
              {errors.server && <div>{errors.server}</div>}
              <Button type="submit" disabled={isSubmitting}>
                Abschicken
              </Button>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default HBISubmitForm;
