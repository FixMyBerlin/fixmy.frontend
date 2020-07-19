import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Button from '~/components2/Button';
import Logo from '~/components2/LogoFooter';
import { media } from '~/styles/utils';
import { getAppPath } from '~/utils/utils';

const LinkButton = styled(Button)`
  width: 100%;

  ${media.s`
      width: initial;
  `}

  ${media.m`
    margin: 1em auto;
  `}
`;

const Thanks = ({ submission, district }) => {
  const sharingUrl = `https://fixmyberlin.de${getAppPath(district, 'gastro')}`;
  return (
    <>
      <h2>Vielen Dank für Ihre Interessensbekundung</h2>
      <p>
        Sie haben einen Bedarf für <strong>{submission.shop_name}</strong> an
        der Adresse <strong>{submission.address}</strong> gemeldet.
      </p>

      {district.apps.gastro.signup?.thanksMessage ? (
        <p>{district.apps.gastro.signup.thanksMessage}</p>
      ) : (
        <>
          <p>
            Das Bezirksamt bearbeitet alle Meldungen nach Ablauf der Frist und
            wird sich dann mit Informationen zum weiteren Vorgehen bei Ihnen
            melden.
          </p>
          <p>
            Wenn sich viele Betriebe in einer Straße melden, kann ggf. der
            gesamte Straßenraum für die temporäre Nutzung freigegeben werden.
            Informieren Sie Ihre Nachbarn und geben Sie diese Information
            weiter.
          </p>
        </>
      )}

      <CopyToClipboard text={sharingUrl}>
        <LinkButton flat>Link kopieren</LinkButton>
      </CopyToClipboard>
      <Logo>Bereitgestellt durch FixMyBerlin</Logo>
    </>
  );
};

const mapStateToProps = ({ AppState }) => ({ district: AppState.district });

export default connect(mapStateToProps)(Thanks);
