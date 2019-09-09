import React, { PureComponent } from 'react';
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
import { addUserToReport } from '~/pages/Reports/apiservice';
import { apiUpdate } from '~/pages/User/apiservice';

import thanksImageSrc from '~/images/reports/reports-thanks.png';
import Link from '~/components/Link';

const formConfig = [{
  id: 'email',
  value: '',
  type: 'email',
  label: '',
  placeholder: 'Deine E-Mailadresse',
  validateError: 'Bitte geben Sie eine E-Mail an.'
}, {
  id: 'login',
  value: false,
  type: 'checkbox',
  labelUser: 'Ich möchte einen Login bei FixMyBerlin erstellen, um über den Fortschritt meiner Meldung informiert zu werden.',
  labelNoUser: 'Ich möchte einen Login bei FixMyBerlin erstellen, um über den Fortschritt meiner Meldung informiert zu werden.'
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

const LoginLink = styled(Link)`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 48px;
`;

const FormWrapper = styled.div`
  margin-bottom: 16px;

  .formtype-checkbox {
    display: flex;

    span {
      font-size: 12px;
    }

    input {
      width: auto;
      margin-right: 10px;
    }
  }
`;

class ReportSubmitted extends PureComponent {
  componentDidMount = () => {
    this.unlistenToHistory = history.listen((location, action) => {
      if (action === 'POP') { // if this is an attempt to navigate backwards ..
        // do not allow navigating back within the dialog, instead route somewhere safe
        this.props.history.push(`${config.routes.reports.map}`);
      }
    });
  };

  componentWillUnmount() {
    this.unlistenToHistory();
  }

  async onSubmitLoggedIn(values, { setSubmitting, setErrors }) {
    if (values.login) {
      await addUserToReport(this.props.reportId, this.props.user.id);
    }

    if (values.newsletter) {
      await apiUpdate({ newsletter: true }, this.props.token);
    }

    setErrors(false);
    setSubmitting(false);

    this.goToMap();
  }

  onSubmit = async (values, { setSubmitting, setErrors }) => {
    if (this.props.token) {
      await this.onSubmitLoggedIn(values, { setSubmitting, setErrors });
      return false;
    }

    if (!values.login && values.newsletter) {
      // @TODO handle news letter api request
      console.log('handle news letter api request');
      setErrors(false);
      setSubmitting(false);
      return false;
    }

    if (values.login) {
      const userData = {
        email: values.email,
        username: values.email,
        password: 'fixmyberlin!',
        newsletter: values.newsletter
      };

      try {
        const user = await ky.post(`${config.apiUrl}/users/create`, { json: userData }).json();
        await addUserToReport(this.props.reportId, user.id);
      } catch (err) {
        setSubmitting(false);
        return setErrors({ server: 'Es gab ein Problem mit dem Server. Bitte versuche es noch ein mal.' });
      }

      if (values.newsletter) {
        await apiUpdate({ newsletter: true }, this.props.token);
      }

      setErrors(false);
      setSubmitting(false);

      this.goToMap();
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
    if (!values.email && !this.props.token) {
      res[item.id] = item.validateError;
    }

    return res;
  }, {})

  render() {
    const { error, token } = this.props;

    // TODO: extend error handling. The user should be able to retry the request or at least be navigated back somewhere
    // TODO: factor out leave-email section as component
    if (error.message) return <ErrorMessage message={error.message} />;

    const formConfigParsed = formConfig
    // change checkbox label for logged in users
      .map((c) => {
        if (c.id === 'login') {
          c.label = token ? c.labelUser : c.labelNoUser;
        }

        return c;
      })
      // don't show email field for logged in users
      .filter(c => (token ? c.id !== 'email' : true));

    return (
      <DialogStepWrapper>
        <StyledHeading>Du hilfst mit, Friedrichshain-Kreuzberg radfreundlicher
          zu machen!
        </StyledHeading>

        <ThanksImg src={thanksImageSrc} />

        <Text>
          Deine Meldung ist nun online! Alle Meldungen werden gesammelt und dann dem Bezirksamt am 10. Oktober 2019 übergeben.
          Die Planer:innen im Straßen- und Grünflächenamt prüfen, welche Meldungen umgesetzt werden können.
          Die Ergebnisse siehst du anschließend hier auf der Karte und wenn du deine E-Mail-Adresse eingibst,
          benachrichtigen wir dich auch per E-Mail.
        </Text>

        <HorizontalRuler />

        <Heading>
          {token ?
            'Erhalte Updates zu deiner Meldung und trage dich beim Newsletter ein.' :
            'Gib deine Emailadresse an, damit die Verwaltungsmitarbeiter dir Informationen zum Status deiner Meldung schicken können.'
          }
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
                         {formConfigParsed.map(d => (
                           <FormField
                             key={`feedbackfield__${d.id}`}
                             className={`formtype-${d.type}`}
                             {...d}
                             values={values}
                             errors={errors}
                             handleChange={handleChange}
                           />
                ))}
                         {errors.server && <div>{errors.server}</div>}
                         <ButtonWrapper>
                           <SubmitButton type="submit" disabled={isSubmitting}>
                    Absenden
                           </SubmitButton>
                         </ButtonWrapper>
                       </Form>
            )}
          />
        </FormWrapper>

        <LoginLink to={config.routes.login}>Ich habe bereits einen Login</LoginLink>

        <GhostButton
          onClick={this.goToMap}
          style={{ marginTop: 25 }}
        >
          Meldung anzeigen<br />
          (weiter ohne Login)
        </GhostButton>

      </DialogStepWrapper>
    );
  }
}

export default withRouter(ReportSubmitted);
