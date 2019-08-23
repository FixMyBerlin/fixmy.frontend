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

import thanksImageSrc from '~/images/reports/reports-thanks.png';

const formConfig = [{
    id: 'email', value: '', type: 'email', label: '', placeholder: 'Deine E-Mailadresse', validateError: 'Bitte geben Sie eine E-Mail an.'
  }, {
    id: 'login', value: false, type: 'checkbox', labelUser: 'Ich möchte über den Fortschritt meiner Meldung informiert werden.', labelNoUser: 'Ich möchte einen Login bei FixMyBerlin erstellen, um über den Fortschritt meiner Meldung informiert zu werden.'
  }, {
    id: 'newsletter', value: false, type: 'checkbox', label: 'Ich möchte den FixMyBerlin Newsletter mit Updates zu Planungen erhalten'
  }
];

export const initialValues = formConfig.reduce((res, item) => {
  res[item.id] = item.value;
  return res;
}, {});


const StyledHeading = styled(Heading)`
  margin-top: 6px;
  margin-bottom: 8px;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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

  onSubmitLoggedIn(values, { setSubmitting, setErrors }) {
    // @TODO handle logged in user
    console.log('handle logged in user');

    setErrors(false);
    setSubmitting(false);
  }

  onSubmit = async (values, { setSubmitting, setErrors }) => {
    if (this.props.token) {
      return this.onSubmitLoggedIn(values, { setSubmitting, setErrors });
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
        const reportPatch = await ky(`${config.apiUrl}/reports/${this.props.reportId}`, { method: 'PATCH', json: { user: user.id } }).json();

        this.props.history.push(`${config.routes.reports.map}/${this.props.reportId}`);
      } catch (err) {
        setSubmitting(false);
        return setErrors({ server: 'Es gab ein Problem mit dem Server. Bitte versuche es noch ein mal.' });
      }
    }

    setErrors(false);
    setSubmitting(false);
  }

  revealReportOnMap = () => {
    const { reportId } = this.props;
    if (!reportId) {
      console.error('No id was passed to reveal the report on the map');
      return;
    }
    this.props.history.push(`${config.routes.reports.map}/${reportId}`);
  }

  validate = values => formConfig.reduce((res, item) => {
    if (!values[item.id] && item.validateError) {
      res[item.id] = item.validateError;
    }

    return res;
  }, {})

  render() {
    const { error, token } = this.props;

    // TODO: extend error handling. The user should be able to retry the request or at least be navigated back somewhere
    // TODO: factor out leave-email section as component
    if (error.message) return <ErrorMessage message={error.message} />;

    formConfig.forEach((c) => {
      if (c.id === 'login') {
        c.label = token ? c.labelUser : c.labelNoUser;
      }
    });

    return (
      <DialogStepWrapper>
        <StyledHeading>Du hilfst mit Friedrichshain-Kreuzberg radfreundlicher zu machen!</StyledHeading>

        <ThanksImg src={thanksImageSrc} />

        <Text>
          Deine Meldung ist nun online, alle Meldungen werden gesammelt und dem Bezirksamt am XX. XXX übergeben.
          Die Planer*innen im Tiefbauamt prüfen dann welche Meldungen umgesetzt werden können. Die Ergebnisse siehst du hier auf der Karte.
        </Text>

        <HorizontalRuler />

        <Heading>
          Gib deine Emailadresse an, damit die Verwaltungsmitarbeiter dir Informationen zum Status deiner Meldung schicken können
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
                  />
                ))}
                {errors.server && <div>{errors.server}</div>}
                <ButtonWrapper>
                  <Button type="submit" disabled={isSubmitting}>
                    Absenden
                  </Button>
                </ButtonWrapper>
              </Form>
            )}
          />
        </FormWrapper>

        <GhostButton
          onClick={this.revealReportOnMap}
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
