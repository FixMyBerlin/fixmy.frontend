import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import Axios from 'axios';

import Headline from '~/components/Headline';
import Button from '~/components/Button';
import Form from '~/components/Form';

import FormField from './FormField';
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

    Axios
      .post(`${config.apiUrl}/api/profiles`, { uuid: this.props.userid, ...cleanValues })
      .then(() => {
        setSubmitting(false);
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
        <Headline>Profil speichern</Headline>
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
              {formConfig.map(d => <FormField key={`hbifield__${d.id}`} {...d} values={values} />)}
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
