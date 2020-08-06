import React, { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import styled from 'styled-components';
import debug from 'debug';
import { connect, useSelector } from 'react-redux';

import { GastroRegistration } from '../types';
import Header from '../components/Header';
import config from '../config';
import { media } from '~/styles/utils';
import Button from '~/components2/Button';
import api from '../api';
import BigLoader from '~/components/BigLoader';
import { RootState } from '~/store';
import { DistrictConfig } from '~/types';
import ThanksRegistration from '../components/ThanksRegistration';

const log = debug('fmc:gastro');

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
    params: { id, accessKey }
  }
}) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>(null);
  const [application, setApplication] = useState<GastroRegistration>(null);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [submission, setSubmission] = useState<GastroRegistration>(null);

  const district: DistrictConfig = useSelector(
    (state: RootState) => state.AppState.district
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
      setSubmission(await api.postRenewal(id, accessKey, district));
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header showInfoLink />
      <Container maxWidth="sm">
        {isLoading && <BigLoader />}
        {!isLoading && (
          <>
            {submission == null && (
              <Section>
                <h1>Folgeantrag auf Genehmigung einer Sondernutzungsfläche</h1>
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
            {submission != null && (
              <ThanksRegistration submission={submission} />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default Renewal;
