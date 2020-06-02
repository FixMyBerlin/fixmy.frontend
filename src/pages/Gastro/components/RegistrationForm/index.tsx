import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import {
  TextField,
  CheckboxWithLabel,
  Select,
  SimpleFileUpload
} from 'formik-material-ui';
import {
  FormHelperText,
  FormControl,
  InputLabel,
  MenuItem,
  LinearProgress,
  Card,
  CardContent
} from '@material-ui/core';
import styled from 'styled-components';

import Button, { AnchorButton } from '~/components2/Button';
import { Form } from '~/components2/Form';
import StaticMap from '~/components2/StaticMap';
import AreaPicker from '~/components2/AreaPicker';
import logger from '~/utils/logger';
import config from '~/pages/Gastro/config';
import { GastroRegistration } from '~/pages/Gastro/types';
import api from '~/pages/Gastro/api';
import validate from './validate';
import parseLength from '../../parseLength';

/* eslint-disable camelcase */
export interface FormData {
  shop_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  category?: string;
  email?: string;
  address?: string;
  location?: [number, number];
  shopfront_length?: string;
  usage?: string;
  certificate?: string;
  opening_hours?: string;
  agreement_accepted?: boolean | '';
  tos_accepted?: boolean | '';
}
/* eslint-enable camelcase */

const initialValues: FormData = {
  shop_name: '',
  first_name: '',
  last_name: '',
  phone: '',
  category: '',
  email: '',
  address: '',
  location: null,
  shopfront_length: '',
  usage: '',
  certificate: null,
  agreement_accepted: '',
  tos_accepted: ''
};

const FormError = styled(FormHelperText)`
  && {
    font-size: 1em;
    line-height: normal;
    margin: 2em auto;
  }
`;

const StyledForm = styled(Form)`
  section {
    margin-bottom: 2em;
  }

  .MuiTextField-root,
  .dropdown {
    margin-bottom: 1em;
  }
`;

const InvisiLabel = styled.label`
  display: none;
`;

const FileInputLabel = styled.label`
  // Separate button and label
  a {
    margin-top: 1em;
  }

  // Hide original form element (it's uggo)
  div:last-child {
    display: none;
  }
`;

const EditIcon = styled.div`
  width: 25px;
  height: 20px;
  margin: 0 3px;
  box-shadow: 0px 5px 5px 0px rgba(0, 0, 0, 0.2);
  vertical-align: text-top;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIgICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiICAgd2lkdGg9IjIwIiAgIGhlaWdodD0iMjAiICAgdmlld0JveD0iMCAwIDIwIDIwIiAgIGlkPSJzdmcxOTE2NyIgICB2ZXJzaW9uPSIxLjEiICAgaW5rc2NhcGU6dmVyc2lvbj0iMC45MStkZXZlbCtvc3htZW51IHIxMjkxMSIgICBzb2RpcG9kaTpkb2NuYW1lPSJzcXVhcmUuc3ZnIj4gIDxkZWZzICAgICBpZD0iZGVmczE5MTY5IiAvPiAgPHNvZGlwb2RpOm5hbWVkdmlldyAgICAgaWQ9ImJhc2UiICAgICBwYWdlY29sb3I9IiNmZmZmZmYiICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIgICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIgICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiICAgICBpbmtzY2FwZTpwYWdlc2hhZG93PSIyIiAgICAgaW5rc2NhcGU6em9vbT0iMTEuMzEzNzA4IiAgICAgaW5rc2NhcGU6Y3g9IjExLjY4MTYzNCIgICAgIGlua3NjYXBlOmN5PSI5LjI4NTcxNDMiICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJsYXllcjEiICAgICBzaG93Z3JpZD0idHJ1ZSIgICAgIHVuaXRzPSJweCIgICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTI4MCIgICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijc1MSIgICAgIGlua3NjYXBlOndpbmRvdy14PSIwIiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjIzIiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMCIgICAgIGlua3NjYXBlOm9iamVjdC1ub2Rlcz0idHJ1ZSI+ICAgIDxpbmtzY2FwZTpncmlkICAgICAgIHR5cGU9Inh5Z3JpZCIgICAgICAgaWQ9ImdyaWQxOTcxNSIgLz4gIDwvc29kaXBvZGk6bmFtZWR2aWV3PiAgPG1ldGFkYXRhICAgICBpZD0ibWV0YWRhdGExOTE3MiI+ICAgIDxyZGY6UkRGPiAgICAgIDxjYzpXb3JrICAgICAgICAgcmRmOmFib3V0PSIiPiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+ICAgICAgICA8ZGM6dHlwZSAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz4gICAgICAgIDxkYzp0aXRsZSAvPiAgICAgIDwvY2M6V29yaz4gICAgPC9yZGY6UkRGPiAgPC9tZXRhZGF0YT4gIDxnICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMSIgICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiICAgICBpZD0ibGF5ZXIxIiAgICAgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwtMTAzMi4zNjIyKSI+ICAgIDxwYXRoICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MC41O21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGQ9Im0gNSwxMDM5LjM2MjIgMCw2IDIsMiA2LDAgMiwtMiAwLC02IC0yLC0yIC02LDAgeiBtIDMsMCA0LDAgMSwxIDAsNCAtMSwxIC00LDAgLTEsLTEgMCwtNCB6IiAgICAgICBpZD0icmVjdDc3OTciICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjY2NjY2NjY2NjY2NjIiAvPiAgICA8Y2lyY2xlICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS42MDAwMDAwMjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBpZD0icGF0aDQzNjQiICAgICAgIGN4PSI2IiAgICAgICBjeT0iMTA0Ni4zNjIyIiAgICAgICByPSIyIiAvPiAgICA8Y2lyY2xlICAgICAgIGlkPSJwYXRoNDM2OCIgICAgICAgc3R5bGU9ImNvbG9yOiMwMDAwMDA7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTt2aXNpYmlsaXR5OnZpc2libGU7ZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDoxLjYwMDAwMDAyO21hcmtlcjpub25lO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGUiICAgICAgIGN4PSIxNCIgICAgICAgY3k9IjEwNDYuMzYyMiIgICAgICAgcj0iMiIgLz4gICAgPGNpcmNsZSAgICAgICBpZD0icGF0aDQzNzAiICAgICAgIHN0eWxlPSJjb2xvcjojMDAwMDAwO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7dmlzaWJpbGl0eTp2aXNpYmxlO2ZpbGw6IzAwMDAwMDtmaWxsLW9wYWNpdHk6MTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6bm9uZTtzdHJva2Utd2lkdGg6MS42MDAwMDAwMjttYXJrZXI6bm9uZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlIiAgICAgICBjeD0iNiIgICAgICAgY3k9IjEwMzguMzYyMiIgICAgICAgcj0iMiIgLz4gICAgPGNpcmNsZSAgICAgICBzdHlsZT0iY29sb3I6IzAwMDAwMDtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO3Zpc2liaWxpdHk6dmlzaWJsZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjEuNjAwMDAwMDI7bWFya2VyOm5vbmU7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZSIgICAgICAgaWQ9InBhdGg0MzcyIiAgICAgICBjeD0iMTQiICAgICAgIGN5PSIxMDM4LjM2MjIiICAgICAgIHI9IjIiIC8+ICA8L2c+PC9zdmc+);
`;

// Return true if usage for the signup's category is allowed on week days
const usageWeekday = ({ category }) =>
  ['retail', 'workshop'].includes(category);

// Return true if usage for the signup's category is allowed on weekends
const usageWeekend = ({ category }) =>
  ['restaurant', 'social', 'other'].includes(category);

const RegistrationForm = ({
  id,
  // eslint-disable-next-line camelcase
  access_key,
  onSuccess,
  signupData,
  regulation
}) => (
  <Formik
    initialValues={{ ...initialValues, ...signupData }}
    validate={validate}
    onSubmit={async (values, { setSubmitting, setStatus }) => {
      // @ts-ignore
      const registrationData: GastroRegistration = {
        ...signupData,
        ...values,
        id,
        access_key,
        shopfront_length: parseLength(values.shopfront_length),
        opening_hours: 'weekend',
        campaign: config.gastro.campaign
      };

      let uploadFailed = true;
      try {
        await api.uploadCertificate(registrationData);
        uploadFailed = false;
      } catch (e) {
        logger(e);
        setStatus(
          'Es gab leider einen Fehler beim Hochladen Ihrer Gewerbeanmeldung / Ihres Vereinsregisters. Bitte senden Sie dieses Dokument daher als Foto oder PDF per E-Mail an info@fixmyberlin.de'
        );
      }

      try {
        const response = await api.register(registrationData);
        // Additional field that is not part of the response
        //  this is to signal to the thanks page whether the upload
        // of the certificate file failed
        // @ts-ignore
        response.uploadFailed = uploadFailed;
        onSuccess(response);
      } catch (e) {
        logger(e);
        setStatus(
          'Es gab leider einen Fehler bei Ihrer Anmeldung. Bitte versuchen Sie es später noch einmal.'
        );
      }
      setSubmitting(false);
    }}
  >
    {({ isValid, values, handleChange, isSubmitting }) => (
      <StyledForm>
        <section>
          <h4>Bitte vervollständigen Sie die Angaben zu Ihrem Betrieb:</h4>

          <p>
            <strong>Name des Betriebs: {values.shop_name}</strong>
          </p>

          <ErrorMessage
            name="category"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
          <div className="dropdown">
            <FormControl fullWidth>
              <InputLabel htmlFor="category">
                Art des Betriebs wählen
              </InputLabel>
              <Field
                component={Select}
                name="category"
                inputProps={{
                  id: 'category'
                }}
              >
                <MenuItem value="restaurant">Restaurant</MenuItem>
                <MenuItem value="retail">Einzelhandel mit Auslage</MenuItem>
                <MenuItem value="workshop">Werkstatt</MenuItem>
                <MenuItem value="social">Soziales Projekt</MenuItem>
                <MenuItem value="other">Sonstiger Bedarf</MenuItem>
              </Field>
            </FormControl>
          </div>
          <InvisiLabel htmlFor="first_name">Vorname der Inhaber:in</InvisiLabel>
          <Field
            id="first_name"
            name="first_name"
            component={TextField}
            label="Vorname der Inhaber:in"
            fullWidth
          />
          <InvisiLabel htmlFor="last_name">Nachname der Inhaber:in</InvisiLabel>
          <Field
            id="last_name"
            name="last_name"
            component={TextField}
            label="Nachname der Inhaber:in"
            fullWidth
          />
          <InvisiLabel htmlFor="phone">
            Telefonnummer (tagsüber erreichbar)
          </InvisiLabel>
          <Field
            id="phone"
            name="phone"
            component={TextField}
            label="Telefonnummer (tagsüber erreichbar)"
            fullWidth
          />
        </section>

        <section>
          <InvisiLabel htmlFor="first_name">
            Addresse des Ladengeschäfts
          </InvisiLabel>
          <Field
            id="address"
            name="address"
            component={TextField}
            label="Addresse des Ladengeschäfts"
            disabled
            fullWidth
          />
          <StaticMap location={signupData?.geometry?.coordinates} />
        </section>

        {regulation && regulation.zone === 'Parkplatz' && (
          <section>
            <h3>Bestimmung der Sondernutzungsfläche</h3>
            <p>
              Für Ihren Betrieb / Verein kann grundsätzlich eine
              Sondernutzungsfläche{' '}
              <strong>im Bereich der derzeitigen Parkflächen</strong> zur
              Verfügung gestellt werden.
            </p>
            <p>
              Die späteren Anordnungen werden nach folgendem Regelplan
              getroffen:
            </p>
            <ul>
              <li>
                <a
                  href="/uploads/offene-terrassen/20200527_BAFK_RP%20Sondernutzung%20Parkstreifen.pdf"
                  className="external"
                  target="_blank"
                >
                  Regelplan Sondernutzungsflächen
                </a>
              </li>
            </ul>

            <p>
              Die Sondernutzungsfläche kann nach Einrichtung
              {usageWeekday(values) && (
                <>Montags bis Freitags, jeweils von 10 bis 20 Uhr</>
              )}
              {usageWeekend(values) && (
                <>Freitags, Samstags und Sonntags, jeweils von 11 bis 22 Uhr</>
              )}
              genutzt werden. Die Nutzung der Sonderflächen erfolgt kostenfrei
              zunächst bis zum 31.8.2020.
            </p>

            <p>
              <strong>
                Bitte zeichnen Sie auf der untenstehenden Karte ein, wo genau
                Sie die Sonderfläche nutzen möchten:
              </strong>
            </p>
            <p>Bitte beachten Sie beim Einzeichnen folgende Punkte:</p>
            <ul>
              <li>
                Es können keine Flächen auf Einfahrten, Behindertenparkplätzen,
                Bushaltestellen, Schaltschränken, Baumscheiben oder Baustellen
                beantragt werden.
              </li>
              <li>
                Die eingezeichnete Fläche muss sich im Bereich der Straßenfront
                Ihres Ladenlokals befinden.
              </li>
            </ul>

            <AreaPicker
              center={signupData?.geometry?.coordinates}
              onSelect={(value) => {
                handleChange({
                  target: {
                    name: 'area',
                    value
                  }
                });
              }}
            />

            <Card>
              <CardContent>
                <p>
                  <strong>Anleitung zum Zeichnen der Fläche</strong>
                </p>
                <ol>
                  <li>
                    Die Karte durch klicken und ziehen bewegen, so dass Sie den
                    gewünschten Bereich als ganzes sehen können.
                  </li>
                  <li>
                    Das Werkzeug <EditIcon /> oben rechts auswählen.
                  </li>
                  <li>
                    Fläche zeichnen, durch anklicken mehrerer Punkte auf der
                    Karte
                  </li>
                  <li>
                    Fläche schließen, indem der erste Punkt erneut geklickt
                    wird.
                  </li>
                </ol>
              </CardContent>
            </Card>
          </section>
        )}

        {regulation && regulation.zone !== 'Parkplatz' && (
          <section>
            <p>
              <strong>
                Ihr Betrieb liegt im Bereich der {regulation?.street}, hier wird
                es eine Gesamt-Anordnung für den rot markierten Bereich{' '}
                {regulation?.street} {regulation?.from} bis {regulation?.to}{' '}
                geben. Wenn Sie sich registrieren, können Sie in diesem Bereich
                teilnehmen.
              </strong>
            </p>
            <p>
              <a href="/" className="internal">
                Karte der anzuordnenden Fläche
              </a>
            </p>
            <p>
              Die Sondernutzungsfläche kann nach Einrichtung Freitags, Samstags
              und Sonntags, jeweils von 11 bis 22 Uhr genutzt werden.
            </p>
          </section>
        )}

        <section>
          <p>
            <strong>
              Wie breit ist die Straßenfront ihres Ladenlokals (falls
              vorhanden)?
            </strong>
          </p>
          <p>
            Auf Grundlage der Straßenfront-Breite kann das Bezirksamt
            entscheiden welcher Raum im Straßenland genutzt werden kann. Sofern
            sie kein Ladenlokal haben bitte 0 angeben.
          </p>
          <InvisiLabel htmlFor="shopfront_length">
            Angabe in Metern z.B. 4,8
          </InvisiLabel>
          <Field
            id="shopfront_length"
            name="shopfront_length"
            type="text"
            inputMode="numeric"
            pattern="[0-9]+(,[0-9]+)?"
            component={TextField}
            label="Angabe in Metern z.B. 4,8"
            fullWidth
          />
        </section>

        <section>
          <p>
            <strong>
              Bitte formulieren Sie kurze Angaben zum Nutzungszweck der
              beantragten Fläche:
            </strong>
          </p>
          <InvisiLabel htmlFor="usage">Nutzungszweck</InvisiLabel>
          <Field
            id="usage"
            name="usage"
            type="text"
            component={TextField}
            label="Nutzungszweck"
            placeholder="z.B. Schankvorgarten, Warenauslagen, Werkstatt, oder anderer Zweck"
            multiline
            rows={4}
            fullWidth
          />
        </section>

        <section>
          <p>
            <strong>
              Bitte laden Sie hier die erste Seite Ihrer Gewerbeanmeldung /
              Ihres Vereinsregisters hoch.
            </strong>
          </p>
          <FileInputLabel>
            <div>
              Wählen Sie eine PDF- oder Bilddatei aus oder machen Sie ein Foto
              (Schrift muss lesbar sein)
            </div>
            <AnchorButton flat disabled={isSubmitting} aria-hidden="true">
              {values.certificate == null ? (
                'Foto oder PDF auswählen'
              ) : (
                <span>
                  <span role="img" aria-label="file">
                    💾
                  </span>{' '}
                  {values.certificate?.name}
                </span>
              )}
            </AnchorButton>

            <ErrorMessage
              name="certificate"
              render={(msg) => <FormError error>{msg}</FormError>}
            />

            <Field
              component={SimpleFileUpload}
              name="certificate"
              type="file"
              inputProps={{
                accept: 'image/*,application/pdf,application/vnd.ms-excel',
                capture: 'environment'
              }}
            />
          </FileInputLabel>
        </section>

        <section>
          <p>
            <strong>Bedingungen für die Nutzung der Sonderflächen</strong>
          </p>
          <p>
            Damit Sie die Sonderfläche nutzen können, müssen Sie der
            Kooperationsvereinbarung mit dem Bezirksamt Friedrichshain-Kreuzberg
            zustimmen, damit sichern Sie folgende Punkte zu:
          </p>
          <ul>
            <li>
              Eigenverantwortliche{' '}
              <strong>Durchführung der verkehrsrechtlichen Anordnung</strong>.
              Sie müssen eigenverantwortlich dazu eine Beschilderungsfirma
              beauftragen für die Fläche die dem Regelplan entsprechenden
              Schilder und Absperrungen aufzustellen. Liste mit
              Beschilderungsfirmen in Berlin
            </li>
            <li>
              <strong>Freihaltung von ausreichend breiten Gehwegen</strong> muss
              sichergestellt werden (Mindestens 2 Meter) Dies wird durch das
              Ordnungsamt stichprobenartig überprüft, bei Nichteinhaltung kann
              die Genehmigung entzogen werden.
            </li>
            <li>
              Die Nutzung der Flächen des ruhenden Verkehrs ist auf{' '}
              <strong>
                Freitag, Samstag und Sonntag jeweils von 11 Uhr bis 22 Uhr
              </strong>{' '}
              begrenzt. (Bei Einzelhandel Montags - Freitag jeweils von 10 bis
              20 Uhr) Die Flächen sind außerhalb der Nutzungszeiten zu beräumen
              und dem ruhenden Verkehr wieder zur Verfügung zu stellen.
            </li>
            <li>
              Verpflichtung zur Einführung eines{' '}
              <strong>Pfandsystems für Einweggebinde</strong> bei der Herausgabe
              von Speisen. Damit durch die zusätzlichen Gastronomieflächen keine
              zusätzlichen Müllmengen entstehen, erklären sich die beantragenden
              Betriebe grundsätzlich bereit, ein Pfandsystem einzuführen.
              Selbstverständlich dürfen vorhandene Mehrweggeschirre genutzt
              werden. Zeitpunkt und Gebiete, in denen das Pfandsystem eingeführt
              wird stehen noch nicht fest. Für die Herausgabe von Einweggebinden
              stellt das Bezirksamt entsprechende Pfandrollen zur Verfügung, die
              erst nach Herausgabe der Kartons / Becher samt Vereinnahmung des
              Pfandes erstattet werden müssen. Darüber hinaus entstehen den
              Gastronomiebetrieben keine Aufwendungen; Das Pfand wird 2€ für
              Pizza- und Essenskartons / Schalen, sowie 1€ für Kaffeebecher
              betragen. Die Rückholung erfolgt unabhängig von den
              Gastronomiebetrieben durch einen Sozialhilfeträger.
            </li>
          </ul>
          <div className="checkboxFieldGroup">
            <ErrorMessage
              name="agreement_accepted"
              render={(msg) => <FormError error>{msg}</FormError>}
            />
            <Field
              component={CheckboxWithLabel}
              name="agreement_accepted"
              type="checkbox"
              Label={{
                label: (
                  <span>
                    Ich habe die Bedingungen für die Nutzung der Sonderfläche
                    gelesen und stimme ihnen zu.
                  </span>
                )
              }}
            />
          </div>
        </section>

        <section>
          <h4>Ihre E-Mail-Adresse</h4>
          <p className="subline">
            Ihre Daten werden für Durchführung des Verfahrens gespeichert, der
            Name Ihres Betriebes kann im Zuge der Aktion{' '}
            <em>Offene Terrassen für Friedrichshain-Kreuzberg</em>{' '}
            veröffentlicht werden.
          </p>
          <InvisiLabel htmlFor="email">Ihre E-Mail-Adresse</InvisiLabel>
          <Field
            id="email"
            name="email"
            component={TextField}
            label="Ihre E-Mail-Adresse"
            fullWidth
          />
        </section>
        <div className="checkboxFieldGroup">
          <ErrorMessage
            name="tos_accepted"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
          <Field
            component={CheckboxWithLabel}
            name="tos_accepted"
            type="checkbox"
            Label={{
              label: (
                <span>
                  Ich habe die{' '}
                  <a
                    href="/datenschutz"
                    target="_blank"
                    rel="noreferrer nofollow"
                    className="internal"
                  >
                    Datenschutzvereinbarung
                  </a>{' '}
                  gelesen und willige in die Speicherung meiner Daten zur
                  Kommunikation im Zuge der Nutzung der Sonderflächen ein.
                </span>
              )
            }}
          />
        </div>

        {!isSubmitting && (
          <p>
            Klicken Sie auf &quot;Antrag absenden&quot; um Ihren Antrag formal
            beim Bezirksamt einzureichen.
          </p>
        )}

        {!isValid && (
          <p>
            <em>
              Sie haben noch nicht alle benötigten Felder korrekt ausgefüllt.
            </em>
          </p>
        )}

        {isSubmitting && <LinearProgress />}

        <Button flat type="submit" disabled={isSubmitting}>
          Antrag absenden
        </Button>
      </StyledForm>
    )}
  </Formik>
);

export default RegistrationForm;
