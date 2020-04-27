import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Container } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { generatePath } from 'react-router-dom';
import styled from 'styled-components';

import Header from '../components/Header';
import { getStreetInfo } from '~/pages/Spielstrassen/utils';
import KiezNotFound from '../components/NotFound';
import KiezMap from '../components/KiezMap';
import ShareButton from '../components/ShareButton';
import ShareButtonDesktop from '../components/ShareButtonDesktop';
import Button from '~/components2/Button';
import config from '../config';
import { media } from '~/styles/utils';

const LinkButton = styled(Button)`
  width: 100%;

  ${media.s`
      width: initial;
  `}

  ${media.m`
    margin: 1em auto;
  `}
`;

const Thanks = ({ match, streets, streetRequest }) => {
  const [street, setStreet] = useState(
    getStreetInfo(streets, match.params?.slug)
  );

  useEffect(() => {
    setStreet(getStreetInfo(streets, match.params?.slug));
  }, [match, streets]);

  if (street == null) return <KiezNotFound />;

  const sharingUrlRelative = generatePath(
    config.routes.spielstrassen.register,
    { slug: match.params.slug }
  );
  const sharingUrl = `https://fixmyberlin.de${sharingUrlRelative}`;
  const shareText = `${config.spielstrassen.shareText} ${sharingUrl}`;

  return (
    <>
      <Header showInfoLink />
      <Container maxWidth="md">
        <h1>{street.street}</h1>
        <p>Temporäre Spielstraße im Kiez {street.kiez}:</p>
        <KiezMap street={street.street} />
        <h2>
          Vielen Dank, Sie sind Unterstützer:in Nr. {street.supporters + 1}
        </h2>
        <p>
          Das Bezirksamt meldet sich bei Ihnen, sobald sich sieben Personen
          registriert haben. Teilen Sie diese Seite mit anderen Personen, die
          bei der Spielstraße in der Bergmannstraße helfen können.
        </p>
        <CopyToClipboard text={sharingUrl}>
          <LinkButton flat>Link kopieren</LinkButton>
        </CopyToClipboard>
        <ShareButton text={shareText} url={sharingUrl} />
        {/* <ShareButtonDesktop /> */}
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({ ...state.SpielstrassenState });
// @ts-ignore
export default connect(mapStateToProps)(Thanks);
