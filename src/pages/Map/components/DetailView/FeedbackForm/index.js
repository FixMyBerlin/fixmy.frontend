/* eslint class-methods-use-this: 0 */

import React, { PureComponent } from 'react';
import { Formik } from 'formik';
import Styled from 'styled-components';

import Form from '~/components/Form';
import FormField from '~/components/FormField';
import Button from '~/components/Button';
import formConfig, { initialValues } from './config';

const FormWrapper = Styled.div`
  background: ${config.colors.lightbg};
  padding: 16px;
  margin-top: 16px;
  box-shadow: -1px 0 6px 1px rgba(0, 0, 0, 0.2);
`;

const ButtonWrapper = Styled.div`
  display: flex;
  justify-content: center;
`;

class FeedbackForm extends PureComponent {
  onSubmit(values, { setSubmitting, setErrors }) {
    console.log('submit form', values);

    setSubmitting(false);
    setErrors(false);
  }

  validate(values) {
    return formConfig.reduce((res, item) => {
      if (!values[item.id]) {
        res[item.id] = item.validateError;
      }

      return res;
    }, {});
  }

  render() {
    return (
      <FormWrapper>
        <Formik
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          validate={this.validate}
          render={({
            values,
            errors,
            handleSubmit,
            isSubmitting,
            handleChange
          }) => (
            <Form onSubmit={handleSubmit}>
              {formConfig.map(d => (
                <FormField
                  key={`feedbackfield__${d.id}`}
                  {...d}
                  values={values}
                  errors={errors}
                  handleChange={handleChange}
                />
              ))}
              {errors.server && <div>{errors.server}</div>}
              <ButtonWrapper>
                <Button type="submit" disabled={isSubmitting}>
                  Feedback absenden
                </Button>
              </ButtonWrapper>
            </Form>
          )}
        />
      </FormWrapper>
    );
  }
}

export default FeedbackForm;
