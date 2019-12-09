import React, { Component } from 'react';
import { Formik } from 'formik';
import ky from 'ky';
import PropTypes from 'prop-types';

import Store from '~/store';
import Form from '~/components/Form';
import FormField from '~/components/FormField';
import GhostButton from '~/components/GhostButton';
import ExternalLink from '~/components/ExternalLink';
import { login } from '~/pages/User/UserState';
import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import UserForm from '~/pages/User/components/UserForm';
import { addUserToReport } from '~/pages/Reports/apiservice';
import { apiUser } from '~/pages/User/apiservice';

import {
  ButtonWrapper,
  ErrorLabel,
  FormWrapper,
  LoginExpand,
  SubmitButton
} from './styledComponents';

const loginFormConfig = [
  {
    id: 'username',
    value: '',
    type: 'email',
    label: 'E-Mail',
    placeholder: 'E-Mail eingeben...',
    validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.'
  },
  {
    id: 'password',
    value: '',
    type: 'password',
    label: 'Passwort',
    placeholder: 'Passwort eingeben...',
    validateError: 'Bitte geben Sie Ihr Passwort an.'
  }
];

export const signupFormConfig = [
  {
    id: 'email',
    value: '',
    type: 'email',
    label: '',
    placeholder: 'Deine E-Mailadresse',
    validateError: 'Bitte geben Sie eine E-Mail an.'
  },
  {
    id: 'password',
    value: '',
    type: 'password',
    label: '',
    placeholder: 'Wähle ein Passwort',
    validateError: 'Bitte geben Sie ein Passwort an.'
  },
  {
    id: 'login',
    value: false,
    type: 'checkbox',
    label: (
      <span>
        Ich möchte einen Login bei FixMyBerlin erstellen, um über den
        Fortschritt meiner Meldung informiert zu werden. Die{' '}
        <ExternalLink
          href="https://fixmyberlin.de/datenschutz"
          rel="noopener noreferrer"
          target="_blank"
        >
          Datenschutzerklärung
        </ExternalLink>{' '}
        habe ich gelesen.
      </span>
    ),
    validateError:
      'Bitte bestätigen Sie, dass Sie einen Account erstellen wollen.'
  },
  {
    id: 'newsletter',
    value: false,
    type: 'checkbox',
    label:
      'Ich möchte den FixMyBerlin Newsletter mit Updates zu Planungen erhalten'
  }
];

export const initialValues = signupFormConfig.reduce((res, item) => {
  res[item.id] = item.value;
  return res;
}, {});

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginForm: false
    };
  }

  validate = (values) =>
    signupFormConfig.reduce((res, item) => {
      if (item.validateError && !values[item.id]) {
        res[item.id] = item.validateError;
      }

      return res;
    }, {});

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
      newsletter: values.newsletter
    };

    let errorMessage = false;

    try {
      const user = await ky
        .post(`${config.apiUrl}/users/create`, { json: userData })
        .json();
      await addUserToReport(this.props.reportId, user.id);
    } catch (err) {
      errorMessage = {
        server:
          'Es gab ein Problem mit dem Server. Bitte versuche es noch ein mal.'
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
    return (
      <>
        <HorizontalRuler />
        <Heading>
          Gib deine E-Mailadresse an, damit die Verwaltungsmitarbeiter dir
          Informationen zum Status deiner Meldung schicken können.
        </Heading>

        <FormWrapper>
          <Formik
            initialValues={initialValues}
            onSubmit={this.onSubmit}
            validate={this.validate}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ values, errors, handleSubmit, isSubmitting, handleChange }) => (
              <Form onSubmit={handleSubmit}>
                {signupFormConfig.map((d) => (
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

        <GhostButton onClick={this.props.goToMap} style={{ marginTop: 25 }}>
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
  nextStep: PropTypes.func.isRequired
};

export default AuthForm;
