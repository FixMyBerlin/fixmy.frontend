import React, { Fragment, useEffect, useState } from 'react';
import styled from 'styled-components';
import withRouter from 'react-router/withRouter';
import Link from 'react-router-dom/Link';
import ky from 'ky';
import qs from 'qs';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import Button from '~/components/Button';

import verifyImageSrc from '~/images/user-verify.png';

const StyledHeading = styled(Heading)`
  margin: 6px 0 8px 0;
`;

const Text = styled(Paragraph)`
  margin-top: 0;
  margin-bottom: 16px;
  line-height: 1.4;
`;

const VerifyImage = styled.img`
  max-width: 250px;
  margin: 20px auto 30px auto;
  display: block;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.div`
  margin: 10px 0;
  color: ${config.colors.error};
  font-weight: bold;
  text-align: center;
`;

const UserVerify = ({ match, location }) => {
  const [serverError, serServerError] = useState(null);

  useEffect(() => {
    const confirmUser = async () => {
      const { uid, token } = match.params;
      const { newsletter } = qs.parse(location.search, { ignoreQueryPrefix: true });
      const signupNewsletter = newsletter === 'yes';

      try {
        await ky(`${config.apiUrl}/users/confirm/`, { method: 'POST', json: { uid, token, newsletter: signupNewsletter } }).text();
      } catch (e) {
        console.log(e);
        return serServerError('Ein Fehler ist aufgetreten. Ihre E-Mail konnte nicht verifiziert werden.');
      }
    };

    confirmUser();
  }, []);

  return (
    <ContentPageWrapper>
      <StyledHeading>
        {serverError ?
          'Dein Account konnte leider nicht aktiviert werden!' :
          'Super, dein Account ist aktiviert. Du kannst jetzt Meldungen und Planungen ‚Liken‘.'
        }
      </StyledHeading>

      <VerifyImage src={verifyImageSrc} />

      {!serverError && (
        <Fragment>
          <Text>
            Links oben im Menu kannst du dich an- und abmelden.
            Unter deinem Profil kannst du von dir gelikte Planungen und Meldungen sehen, sowie dein Passwort ändern.
          </Text>
          <ButtonWrapper>
            <Link to={config.routes.login}>
              <Button
                style={{ marginTop: 25, marginBottom: 10 }}
              >
                Zum Login
              </Button>
            </Link>
          </ButtonWrapper>
        </Fragment>
      )}

      {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
    </ContentPageWrapper>
  );
};

export default withRouter(UserVerify);
