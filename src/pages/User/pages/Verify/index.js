import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import ky from 'ky';
import qs from 'qs';

import logger from '~/utils/logger';
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
      const { newsletter } = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });
      const signupNewsletter = newsletter === 'yes';

      try {
        const response = await ky(`${config.apiUrl}/users/confirm/`, {
          method: 'POST',
          json: { uid, token, newsletter: signupNewsletter }
        });
        const body = await response.text();
      } catch (e) {
        logger(e);
        return serServerError(
          'Ein Fehler ist aufgetreten. Ihre E-Mail konnte nicht verifiziert werden. Evtl. wurde Ihr Konto auch schon aktiviert.'
        );
      }
    };

    confirmUser();
  }, []);

  return (
    <ContentPageWrapper>
      <StyledHeading>
        {serverError
          ? 'Dein Account konnte leider nicht aktiviert werden!'
          : 'Super, dein Account ist aktiviert'}
      </StyledHeading>

      <VerifyImage src={verifyImageSrc} />

      {!serverError && (
        <>
          <ButtonWrapper>
            <Link to="/">
              <Button style={{ marginTop: 25, marginBottom: 10 }}>
                Zur Startseite
              </Button>
            </Link>
          </ButtonWrapper>
        </>
      )}

      {serverError && <ErrorMessage>{serverError}</ErrorMessage>}
    </ContentPageWrapper>
  );
};

export default withRouter(UserVerify);
