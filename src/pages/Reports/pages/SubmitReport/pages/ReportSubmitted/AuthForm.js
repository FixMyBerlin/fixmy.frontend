import { Formik } from 'formik';
import ky from 'ky';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import ExternalLink from '~/components/ExternalLink';
import Form from '~/components/Form';
import FormField from '~/components/FormField';
import GhostButton from '~/components/GhostButton';
import { addUserToReport } from '~/pages/Reports/apiservice';
import HorizontalRuler from '~/pages/Reports/components/HorizontalRuler';
import config from '~/pages/Reports/config';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import { login } from '~/pages/User/UserState';
import { apiUser } from '~/pages/User/apiservice';
import UserForm from '~/pages/User/components/UserForm';
import Store from '~/store';

import {
  ButtonWrapper,
  ErrorLabel,
  FormWrapper,
  LoginExpand,
  SubmitButton,
} from './styledComponents';

const loginFormConfig = [
  {
    id: 'username',
    value: '',
    type: 'email',
    label: 'E-Mail',
    placeholder: 'E-Mail eingeben...',
    validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.',
  },
  {
    id: 'password',
    value: '',
    type: 'password',
    label: 'Passwort',
    placeholder: 'Passwort eingeben...',
    validateError: 'Bitte geben Sie Ihr Passwort an.',
  },
];

export const signupFormConfig = [
  {
    id: 'email',
    value: '',
    type: 'email',
    label: '',
    placeholder: 'Deine E-Mailadresse',
    validateError: 'Bitte geben Sie eine E-Mail an.',
  },
  {
    id: 'password',
    value: '',
    type: 'password',
    label: '',
    placeholder: 'Wähle ein Passwort',
    validateError: 'Bitte geben Sie ein Passwort an.',
  },
  {
    id: 'login',
    value: false,
    type: 'checkbox',
    label: (
      <span>
        Ich möchte einen Login bei {config.siteTitle} erstellen, um über den
        Fortschritt meiner Meldung informiert zu werden. Die{' '}
        <ExternalLink
          href="/datenschutz"
          rel="noopener noreferrer"
          target="_blank"
        >
          Datenschutzerklärung
        </ExternalLink>{' '}
        habe ich gelesen.
      </span>
    ),
    validateError:
      'Bitte bestätigen Sie, dass Sie einen Account erstellen wollen.',
  },
  {
    id: 'newsletter',
    enabled: config.reports.form.newsletter,
    value: false,
    type: 'checkbox',
    label: `Ich möchte den ${config.siteTitle}-Newsletter mit Updates zu Planungen erhalten`,
  },
];

export const initialValues = signupFormConfig.reduce((res, item) => {
  res[item.id] = item.value;
  return res;
}, {});

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: false,
    };
  }

  onLoginExpand = () => {
    this.setState((prevState) => ({ showLoginForm: !prevState.showLoginForm }));
  };

  onLoginFormSubmit = (values, params) => {
    Store.dispatch(
      login(values, params, async (data) => {
        const userData = await apiUser(data.token);
        addUserToReport(this.props.reportId, userData.id);
      })
    );
  };

  onSubmit = async (values, { setSubmitting, setErrors }) => {
    const userData = {
      email: values.email,
      username: values.email,
      password: values.password,
      newsletter: values.newsletter,
    };

    let errorMessage = false;

    try {
      const user = await ky
        .post(`${config.apiUrl}/users/`, { json: userData })
        .json();
      await addUserToReport(this.props.reportId, user.id);
    } catch (err) {
      errorMessage = {
        server:
          'Es gab ein Problem mit dem Server. Bitte versuchen Sie es noch einmal.',
      };

      if (err.response && err.response.json) {
        const errResponse = await err.response.json();
        const errKeys = Object.keys(errResponse);

        if (errKeys.length && errResponse[errKeys[0]][0]) {
          errorMessage = { server: errResponse[errKeys[0]][0] };
        }
      }
    }

    setErrors(errorMessage);
    setSubmitting(false);

    if (!errorMessage) {
      this.props.nextStep();
    }
  };

  render() {
    const validate = (values) =>
      signupFormConfig.reduce((res, item) => {
        if (item.validateError && !values[item.id]) {
          res[item.id] = item.validateError;
        }

        return res;
      }, {});

    return (
      <>
        <HorizontalRuler />
        <Heading>
          Geben Sie Ihre E-Mailadresse an, damit Sie Informationen zum Status
          Ihrer Meldung bekommen können.
        </Heading>

        <FormWrapper>
          <Formik
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ values, errors, handleSubmit, isSubmitting, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                {signupFormConfig
                  .filter((fieldConfig) => fieldConfig.enabled !== false)
                  .map((d) => (
                    <FormField
                      key={`feedbackfield__${d.id}`}
                      className={`formtype-${d.type}`}
                      {...d}
                      values={values}
                      errors={errors}
                      handleChange={handleChange}
                      disabled={
                        d.id === 'newsletter' &&
                        (!values.login || values.email === '')
                      }
                    />
                  ))}
                {errors.server && <ErrorLabel>{errors.server}</ErrorLabel>}
                <ButtonWrapper>
                  <SubmitButton type="submit" disabled={isSubmitting}>
                    Absenden
                  </SubmitButton>
                </ButtonWrapper>
              </Form>
            )}
          </Formik>
        </FormWrapper>

        <LoginExpand onClick={this.onLoginExpand}>
          Ich habe bereits einen Login
        </LoginExpand>

        {this.state.showLoginForm && (
          <UserForm
            title="Login"
            buttonLabel="Einloggen"
            formConfig={loginFormConfig}
            onSubmit={this.onLoginFormSubmit}
          />
        )}

        <GhostButton
          onClick={this.props.goToMap}
          style={{ marginTop: 25 }}
          data-cy="reports-submitted-anon-show-report"
        >
          Meldung anzeigen
          <br />
          (weiter ohne Login)
        </GhostButton>
      </>
    );
  }
}

AuthForm.propTypes = {
  reportId: PropTypes.number.isRequired,
  goToMap: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default AuthForm;
