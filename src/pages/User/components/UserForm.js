// used for signup and login
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';

import config from '~/config';
import Text from '~/components/Text';
import Title from '~/components/Title';
import Link from '~/components/Link';
import SectionTitle from '~/components/SectionTitle';
import Form from '~/components/Form';
import Button from '~/components/Button';
import FormField from '~/components/FormField';
import FormFieldError from '~/components/FormFieldError';

import { translateError } from '~/utils/error-utils';

const UserFormWrapper = styled.div`
  margin-bottom: 16px;
  width: 100%;

  input[type='checkbox'] {
    width: auto;
    display: inline-block;
  }
`;

function renderStatus(status) {
  switch (status) {
    case 'loginsuccess':
      return (
        <Text>
          Du hast dich erfolgreich eingeloggt. <Link to="/">Hier</Link> gelangst
          du zum Start.
        </Text>
      );
    case 'signupsuccess':
      return <Text>Du hast dich erfolgreich registriert.</Text>;
    case 'usernamesuccess':
      return (
        <Text>
          Du hast Deine E-Mail-Adresse geändert,{' '}
          <Link to={config.routes.login}>bitte logge Dich neu ein</Link>
        </Text>
      );
    case 'passwordsuccess':
      return <Text>Du hast Dein Passwort erfolgreich geändert.</Text>;
    case 'logoutsuccess':
      return <Text>Du hast dich erfolgreich ausgeloggt.</Text>;
    case 'forgotsuccess':
      return (
        <Text>
          Wir haben eine E-Mail zum zurücksetzen des Passworts geschickt.{' '}
          <Link to="/anmelden">Zurück zum Login</Link>
        </Text>
      );
    case 'forgoterror':
      return (
        <FormFieldError>
          Beim zurücksetzen des Passworts ist ein Fehler aufgetreten.
        </FormFieldError>
      );
    case 'resetsuccess':
      return (
        <Text>
          Dein Passwort wurde zurückgesetzt.{' '}
          <Link to="/anmelden">Zum Login</Link>
        </Text>
      );
    case 'reseterror':
      return (
        <FormFieldError>
          Beim zurücksetzen des Passworts ist ein Fehler aufgetretetn.{' '}
          <Link to="/anmelden">Zum Login</Link>
        </FormFieldError>
      );
    default:
      return null;
  }
}

class UserForm extends PureComponent {
  constructor(props) {
    super(props);

    this.initialValues = props.formConfig.reduce((res, item) => {
      res[item.id] = item.value;
      return res;
    }, {});
  }

  validate = (values) =>
    this.props.formConfig.reduce((res, item) => {
      if (!values[item.id] && item.validateError) {
        res[item.id] = item.validateError;
      }

      return res;
    }, {});

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
        >
          {({ values, errors, handleSubmit, isSubmitting, status }) => (
            <Form onSubmit={handleSubmit}>
              {formConfig.map((d) => (
                <FormField
                  key={`formfield__${d.id}`}
                  {...d}
                  values={values}
                  errors={errors}
                />
              ))}
              {errors.non_field_errors && (
                <FormFieldError>
                  {translateError(errors.non_field_errors)}
                </FormFieldError>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {buttonLabel}
              </Button>
              {status && renderStatus(status)}
            </Form>
          )}
        </Formik>
      </UserFormWrapper>
    );
  }
}

UserForm.defaultProps = {
  onSubmit: () => {},
  buttonLabel: 'Abschicken'
};

export default UserForm;
