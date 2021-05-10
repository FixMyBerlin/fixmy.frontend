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
  supporters = 0,
}) => {
  const signupUrl = generatePath(config.routes.spielstrassen.register, {
    slug: slugify(street, { lower: true }),
  });

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
          {supporters <= district.apps.spielstrassen.supporterGoal && (
            <>
              {supporters} Unter&shy;stützer:in{supporters === 1 ? '' : 'nen'}{' '}
              registriert. Mit {district.apps.spielstrassen.supporterGoal}{' '}
              Kiezlots:innen kann die Spielstraße eingerichtet werden.
            </>
          )}
          {supporters > district.apps.spielstrassen.supporterGoal && (
            <>
              Diese Spielstraße findet bereits statt, benötigt aber weiter ihre
              Unterstützung.
            </>
          )}
        </span>
        <Link to={signupUrl}>
          <SignupButton flat>Unterstützen</SignupButton>
        </Link>
      </footer>
    </KiezCard>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(Kiez);
