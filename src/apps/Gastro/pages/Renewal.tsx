import { Container } from '@material-ui/core';
import debug from 'debug';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Button } from '~/components2/Button';
import { BigLoader } from '~/components2/Loaders';
import { useTypedSelector } from '~/store';
import { media } from '~/styles/utils';
import { DistrictConfig } from '~/types';

import api from '../api';
import Header from '../components/Header';
import config from '../config';
import { GastroRegistration } from '../types';

const log = debug('fmc:gastro:renewal');

const Section = styled.section`
  border-bottom: 2px dashed ${config.colors.lightgrey};
  margin-bottom: 2em;

  ${media.m`
    padding-bottom: 1em;
    margin-bottom: 2em;
  `};

  &:last-child {
    border-bottom: none;
  }

  h1 {
    overflow-wrap: break-word;

    ${media.m`
      margin: 2em 0 1em;
    `};
  }
`;

const Renewal = ({
  match: {
    params: { id, accessKey },
  },
}) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(null);
  const [application, setApplication] = useState<GastroRegistration>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const district: DistrictConfig = useTypedSelector(
    (state) => state.AppState.district
  );

  useEffect(() => {
    log('Loading data for ', id, accessKey);
    const doLoad = async () => {
      try {
        setApplication(await api.getRenewal(id, accessKey, district));
      } catch (err) {
        if (err.message === 'Unauthorized') {
          setError(
            'Ungültige Zugangsdaten. Bitte prüfen Sie, ob Sie den exakten Link aus unserer E-Mail aufgerufen haben.'
          );
        } else {
          setError(err.message);
        }
        throw err;
      } finally {
        setLoading(false);
      }
    };
    doLoad();
  }, [id, accessKey, district]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      setApplication(await api.postRenewal(id, accessKey, district));
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // eslint-disable-next-line camelcase
  const isSubmitted = application?.renewal_application != null;

  log('isSubmitted', isSubmitted);

  return (
    <>
      <Header showInfoLink />
      <Container maxWidth="sm">
        {isLoading && <BigLoader />}
        {!isLoading && (
          <>
            {!isSubmitted && (
              <Section>
                <h1>Folgeantrag auf Nutzung einer Sonderfläche</h1>
                {application != null && (
                  <>
                    <p>
                      Für Ihren Betrieb <strong>{application.shop_name}</strong>{' '}
                      wurde auf Ihren Antrag hin eine Sondernutzungsfläche
                      genehmigt. Hier haben Sie die Möglichkeit, einen
                      Folgeantrag zu stellen. Wird dieser genehmigt, so können
                      sie die Fläche in einem weiteren Zeitraum nach Ende der
                      aktuellen Genehmigung nutzen.
                    </p>
                    <p>
                      Bitte bestätigen Sie Ihren Wunsch, die Genehmigung der
                      Sondernutzungsfläche für einen weiteren Zeitraum bis zum
                      31.10.2020 zu beantragen, indem Sie auf{' '}
                      <em>Folgeantrag stellen</em> klicken.
                    </p>
                    <Button flat onClick={handleSubmit} disabled={isSubmitting}>
                      Folgeantrag stellen
                    </Button>
                  </>
                )}
                {error != null && <p>Es ist ein Fehler aufgetreten: {error}</p>}
              </Section>
            )}
            {isSubmitted && (
              <Section>
                <h1>
                  Vielen Dank für Ihren Folgeantrag auf Nutzung einer
                  Sonderfläche
                </h1>

                <p>
                  Ihr Antrag für <strong>{application.shop_name}</strong> wurde
                  übermittelt.
                </p>

                <p>
                  Das Bezirksamt bearbeitet die Anträge in der Regel innerhalb
                  einiger Tage. Wenn Ihr Antrag bearbeitet wurde, erhalten Sie
                  eine E-Mail mit einer Zu- oder Absage an{' '}
                  <strong>{application.email}</strong>. Bitte sehen Sie von
                  individuellen Nachfragen ab.
                </p>
              </Section>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Renewal;
