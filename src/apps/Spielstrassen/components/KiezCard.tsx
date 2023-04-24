import { Paper } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { generatePath } from 'react-router-dom';
import slugify from 'slugify';
import styled from 'styled-components';

import Link from '~/components/Link';
import { Button } from '~/components2/Button';
import config from '~/config';

import SupporterIcon from './SupporterIcon';

const KiezCard = styled(Paper)`
  padding: 0.5em;
  margin-bottom: 1em;

  dl {
    margin-top: 0;
  }

  dd,
  dt {
    display: inline;
  }

  dd {
    margin-left: 0.5em;
  }

  footer {
    display: flex;

    .supportercount {
      font-size: 0.75em;
      line-height: 1.5em;
      color: ${config.colors.darkgrey};
      hyphens: manual;
      margin-left: 1em;
      margin-right: 0.5em;
    }

    a {
      margin-left: auto;
    }
  }
`;

const SignupButton = styled(Button)`
  // Make sure the button doesn't become higher than one line
  word-break: initial;
  hyphens: initial;
`;

const Schedule = styled.dd`
  margin-left: 0 !important;
  font-size: 12px;
  line-height: 1.2;
  color: ${config.colors.darkgrey};
`;

const Kiez = ({
  district,
  kiez,
  street,
  status,
  schedule = null,
  scheduleType = null,
  supporters = 0,
}) => {
  const signupUrl = generatePath(config.routes.spielstrassen.register, {
    slug: slugify(street, { lower: true }),
  });

  const showSupporterGoal =
    district.apps.spielstrassen.supporterGoal > 0 &&
    supporters <= district.apps.spielstrassen.supporterGoal;

  return (
    <KiezCard elevation={5}>
      <dl>
        <strong>
          <dt>Spielstraße:</dt>
          <dd>{street}</dd>
        </strong>
        <br />
        <dt>Kiez:</dt>
        <dd>{kiez}</dd>
        {schedule && (
          <>
            <br />
            <dt style={{ display: 'none' }}>Öffnungszeiten</dt>
            {status === 'paused' && (
              <Schedule>
                <strong>Diese Spielstraße ist derzeit pausiert.</strong>
              </Schedule>
            )}
            {status !== 'paused' && <Schedule>{schedule}</Schedule>}
          </>
        )}
      </dl>
      <footer>
        <SupporterIcon count={supporters} />
        <span className="supportercount">
          {showSupporterGoal && (
            <>
              {supporters} Unter&shy;stützer:in{supporters === 1 ? '' : 'nen'}{' '}
              registriert. Mit {district.apps.spielstrassen.supporterGoal}{' '}
              Kiezlots:innen kann die Spielstraße eingerichtet werden.
            </>
          )}
          {!showSupporterGoal && scheduleType === 'once_plus' && (
            <>
              Diese Spielstraße findet regelmäßig statt, wenn sich ausreichend
              Kiezlots:innen finden
            </>
          )}
          {!showSupporterGoal && status === 'paused' && (
            <>
              Diese Spielstraße findet erst wieder statt, wenn sich genügend
              neue Unterstützer*innen gefunden haben.
            </>
          )}
          {!showSupporterGoal &&
            scheduleType !== 'once_plus' &&
            status !== 'paused' && (
              <>
                Diese Spielstraße findet regelmäßig statt, und freut sich über
                weitere Unterstützung.
              </>
            )}
        </span>
        <Link to={signupUrl}>
          <SignupButton flat>Mehr Details</SignupButton>
        </Link>
      </footer>
    </KiezCard>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(Kiez);
