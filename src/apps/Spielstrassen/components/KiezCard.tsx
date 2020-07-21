import React from 'react';
import { generatePath } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import slugify from 'slugify';

import config from '~/config';
import Button from '~/components2/Button';
import Link from '~/components/Link';
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

const Kiez = ({ kiez, street, status, supporters = 0 }) => {
  const signupUrl = generatePath(config.routes.spielstrassen.register, {
    slug: slugify(street, { lower: true })
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
      </dl>
      <footer>
        <SupporterIcon count={supporters} />
        <span className="supportercount">
          {supporters} Unter&shy;stützer:in{supporters === 1 ? '' : 'nen'}{' '}
          registriert
        </span>
        <Link to={signupUrl}>
          <Button flat disabled={status === 'closed'}>
            Unterstützen
          </Button>
        </Link>
      </footer>
    </KiezCard>
  );
};

export default Kiez;
