// used for signup and login
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

import Title from '~/components/Title';
import SectionTitle from '~/components/SectionTitle';
import Form from '~/components/Form';
import Button from '~/components/Button';
import FormField from '~/components/FormField';
import FormFieldError from '~/components/FormFieldError';

const UserFormWrapper = styled.div`
  margin-bottom: 16px;
`;

class UserForm extends PureComponent {
  static defaultProps = {
    onSubmit: () => {},
    buttonLabel: 'Abschicken'
  }

  constructor(props) {
    super(props);

    this.initialValues = props.formConfig.reduce((res, item) => {
      res[item.id] = item.value;
      return res;
    }, {});
  }

  validate = values =>
    this.props.formConfig.reduce((res, item) => {
      if (!values[item.id] && item.validateError) {
        res[item.id] = item.validateError;
      }

      return res;
    }, {})

  render() {
    const { title, subtitle, formConfig, buttonLabel } = this.props;
    return (
      <UserFormWrapper>
        {title && <Title>{title}</Title>}
        {subtitle && <SectionTitle>{subtitle}</SectionTitle>}
        <Formik
          initialValues={this.initialValues}
          enableReinitialize
          onSubmit={this.props.onSubmit}
          validate={this.validate}
          validateOnChange={false}
          validateOnBlur={false}
          render={({
            values,
            errors,
            handleSubmit,
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              {formConfig.map(d => (
                <FormField
                  key={`formfield__${d.id}`}
                  {...d}
                  values={values}
                  errors={errors}
                />
              ))}
              {errors.non_field_errors && <FormFieldError>{errors.non_field_errors}</FormFieldError>}
              <Button type="submit" disabled={isSubmitting}>
                {buttonLabel}
              </Button>
            </Form>
          )}
        />
      </UserFormWrapper>
    );
  }
}

export default UserForm;
