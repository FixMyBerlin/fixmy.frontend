// used for signup and login
import React, { PureComponent, Fragment } from 'react';
import { Formik } from 'formik';

import Title from '~/components/styled/Title';
import Form from '~/components/styled/Form';
import Button from '~/components/styled/Button';
import FormField from '~/components/FormField';


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
    const { title, formConfig, buttonLabel } = this.props;
    return (
      <Fragment>
        <Title>{title}</Title>
        <Formik
          initialValues={this.initialValues}
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
              {errors.server && <div>{errors.server}</div>}
              <Button type="submit" disabled={isSubmitting}>
                {buttonLabel}
              </Button>
            </Form>
          )}
        />
      </Fragment>
    );
  }
}

export default UserForm;
