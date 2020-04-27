import React from 'react';
import { generatePath } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import styled from 'styled-components';
import slugify from 'slugify';

import Button from '~/components2/Button';
import Link from '~/components/Link';
import Supporter from '~/images/spielstrassen/supporter.svg';
import SupporterCheck from '~/images/spielstrassen/supporter-check.svg';
import config from '~/pages/Spielstrassen/config';

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

    button {
      margin-left: auto;
    }
  }
`;

const SupportersReached = styled(SupporterCheck)`
  margin-left: -14px;
  margin-top: -5px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

const Kiez = ({ name, street, supporters = 0 }) => {
  const signupUrl = generatePath(config.routes.spielstrassen.register, {
    kiez: slugify(name, { lower: true })
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
        <dd>{name}</dd>
      </dl>
      <footer>
        <Supporter />
        <SupportersReached
          visible={supporters >= config.spielstrassen.supporterGoal}
        />
        <span className="supportercount">
          {supporters} Unter&shy;stützer registriert
        </span>
        <Button flat>
          <Link to={signupUrl}>Unterstützen</Link>
        </Button>
      </footer>
    </KiezCard>
  );
};

export default Kiez;
