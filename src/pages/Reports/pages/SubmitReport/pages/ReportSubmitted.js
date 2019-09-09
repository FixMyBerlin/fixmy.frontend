import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import withRouter from 'react-router/withRouter';
import { Formik } from 'formik';
import ky from 'ky';

import DialogStepWrapper from '~/pages/Reports/pages/SubmitReport/components/DialogStepWrapper';
import ErrorMessage from '~/pages/Reports/components/ErrorMessage';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import HorizontalRuler from '~/pages/Reports/pages/SubmitReport/components/HorizontalRuler';
import Button from '~/components/Button';
import Form from '~/components/Form';
import FormField from '~/components/FormField';
import GhostButton from '~/components/GhostButton';
import history from '~/history';
import Store from '~/store';
import { addUserToReport } from '~/pages/Reports/apiservice';
import { apiUser } from '~/pages/User/apiservice';
import UserForm from '~/pages/User/components/UserForm';
import { login } from '~/pages/User/UserState';
import ExternalLink from '~/components/ExternalLink';

import thanksImageSrc from '~/images/reports/reports-thanks.png';

const formConfig = [{
  id: 'email',
  value: '',
  type: 'email',
  label: '',
  placeholder: 'Deine E-Mailadresse',
  validateError: 'Bitte geben Sie eine E-Mail an.'
}, {
  id: 'password',
  value: '',
  type: 'password',
  label: '',
  placeholder: 'Deine Passwort',
  validateError: 'Bitte geben Sie ein Passwort an.'
}, {
  id: 'login',
  value: false,
  type: 'checkbox',
  label: (
    <span>
      Ich möchte einen Login bei FixMyBerlin erstellen, um über den Fortschritt meiner Meldung informiert zu werden.
      Die <ExternalLink href="https://fixmyberlin.de/datenschutz" rel="noopener noreferrer" target="_blank">Datenschutzerklärung</ExternalLink> habe ich gelesen.
    </span>
  ),
  validateError: 'Bitte bestätigen Sie, dass Sie einen Account erstellen wollen.'
}, {
  id: 'newsletter',
  value: false,
  type: 'checkbox',
  label: 'Ich möchte den FixMyBerlin Newsletter mit Updates zu Planungen erhalten'
}
];

export const initialValues = formConfig.reduce((res, item) => {
  res[item.id] = item.value;
  return res;
}, {});


const StyledHeading = styled(Heading)`
  margin: 6px 0 8px 0;
`;

const Text = styled(Paragraph)`
  margin-top: 0;
  margin-bottom: 32px;
  line-height: 1.4;
`;

const ThanksImg = styled.img`
  width: 50%;
  margin: 20px auto;
  display: block;
`;

const SubmitButton = styled(Button)`
  margin-top: 32px;
  width: 168px;
  font-size: 18px;
  font-weight: bold;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.2);
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LoginExpand = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${config.colors.interaction};
  cursor: pointer;
`;

const FormWrapper = styled.div`
  margin-bottom: 16px;

  .formtype-checkbox {

    span {
      font-size: 12px;
    }

    input {
      width: auto;
      margin-right: 10px;
    }
  }
`;

const ErrorLabel = styled.div`
  color: ${config.colors.error};
  font-weight: 700;
`;

const loginFormConfig = [
  { id: 'username', value: '', type: 'email', label: 'E-Mail', placeholder: 'E-Mail eingeben...', validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.' },
  { id: 'password', value: '', type: 'password', label: 'Passwort', placeholder: 'Passwort eingeben...', validateError: 'Bitte geben Sie Ihr Passwort an.' }
];

class ReportSubmitted extends PureComponent {

  state = {
    showLoginForm: false
  }

  componentDidMount = async () => {
    this.unlistenToHistory = history.listen((location, action) => {
      if (action === 'POP') { // if this is an attempt to navigate backwards ..
        // do not allow navigating back within the dialog, instead route somewhere safe
        this.props.history.push(`${config.routes.reports.map}`);
      }
    });

    if (this.props.token) {
      const userData = await apiUser(this.props.token);
      await addUserToReport(this.props.reportId, userData.id);
    }
  };

  componentWillUnmount() {
    this.unlistenToHistory();
  }

  onSubmit = async (values, { setSubmitting, setErrors }) => {
    const userData = {
      email: values.email,
      username: values.email,
      password: values.password,
      newsletter: values.newsletter
    };

    let errorMessage = false;

    try {
      const user = await ky.post(`${config.apiUrl}/users/create`, { json: userData }).json();
      await addUserToReport(this.props.reportId, user.id);
    } catch (err) {
      errorMessage = { server: 'Es gab ein Problem mit dem Server. Bitte versuche es noch ein mal.' };

      if (err.response && err.response.json) {
        const errResponse = await err.response.json();

        if (errResponse.username) {
          errorMessage = { server: 'Du hast bereits einen Login, bitte melde Dich an.' };
        }
      }
    }

    setErrors(errorMessage);
    setSubmitting(false);

    if (!errorMessage) {
      this.props.nextStep();
    }
  }

  goToMap = () => {
    const { reportId } = this.props;

    if (!reportId) {
      console.error('No id was passed to reveal the report on the map');
      return;
    }

    this.props.history.push(`${config.routes.reports.map}/${reportId}`);
  }

  validate = values => formConfig.reduce((res, item) => {
    if (item.validateError && !values[item.id]) {
      res[item.id] = item.validateError;
    }

    return res;
  }, {})

  onLoginExpand = () => {
    this.setState(prevState => ({ showLoginForm: !prevState.showLoginForm }));
  }

  onLoginFormSubmit = (values, params) => {
    Store.dispatch(login(values, params));
  }

  render() {
    const { error, token } = this.props;

    // TODO: extend error handling. The user should be able to retry the request or at least be navigated back somewhere
    if (error.message) return <ErrorMessage message={error.message} />;

    return (
      <DialogStepWrapper>
        <StyledHeading>Du hilfst mit, Friedrichshain-Kreuzberg radfreundlicher
          zu machen!
        </StyledHeading>

        <ThanksImg src={thanksImageSrc} />

        <Text>
          Deine Meldung ist nun online! Alle Meldungen werden gesammelt und dann dem Bezirksamt am 10. Oktober 2019 übergeben.
          Die Planer:innen im Straßen- und Grünflächenamt prüfen, welche Meldungen umgesetzt werden können.
          Die Ergebnisse siehst du anschließend hier auf der Karte {
            token ?
            'und wir benachrichtigen dich an deine im Login hinterlegte E-Mail-Adresse.' :
            'und wenn du deine E-Mail-Adresse eingibst, benachrichtigen wir dich auch per E-Mail.'
          }
        </Text>

        {token ? (
          <Button onClick={() => this.goToMap()}>
            Meldung jetzt anzeigen
          </Button>
        ) : (
          <Fragment>
            <HorizontalRuler />
            <Heading>
              Gib deine E-Mailadresse an, damit die Verwaltungsmitarbeiter dir Informationen zum Status deiner Meldung schicken können.
            </Heading>

            <FormWrapper>
              <Formik
                initialValues={initialValues}
                onSubmit={this.onSubmit}
                validate={this.validate}
                validateOnChange={false}
                validateOnBlur={false}
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
                        className={`formtype-${d.type}`}
                        {...d}
                        values={values}
                        errors={errors}
                        handleChange={handleChange}
                        disabled={d.id === 'newsletter' && (!values.login || values.email === '')}
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
              />
            </FormWrapper>

            <LoginExpand
              onClick={this.onLoginExpand}
            >
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
              onClick={this.goToMap}
              style={{ marginTop: 25 }}
            >
              Meldung anzeigen<br />
              (weiter ohne Login)
            </GhostButton>
          </Fragment>
        )}
      </DialogStepWrapper>
    );
  }
}

export default withRouter(ReportSubmitted);
