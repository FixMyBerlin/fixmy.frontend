import ky from 'ky';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Button from '~/components/Button';
import ContentPageWrapper from '~/components/ContentPageWrapper';
import config from '~/config';
import verifyImageAachen from '~/images/aachen/user@2x.png';
import verifyImageFMB from '~/images/user-verify.png';
import Heading from '~/pages/Reports/pages/SubmitReport/components/Heading';
import logger from '~/utils/logger';

const verifyImage =
  config.region === 'aachen' ? verifyImageAachen : verifyImageFMB;

const StyledHeading = styled(Heading)`
  margin: 6px 0 8px 0;
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
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      const { uid, token } = match.params;
      const newsletter = new URLSearchParams(location.search).get('newsletter');
      const signupNewsletter = newsletter === 'yes';

      try {
        await ky(`${config.apiUrl}/users/activation/`, {
          method: 'POST',
          json: { uid, token, newsletter: signupNewsletter },
        });
      } catch (e) {
        logger(e);
        setServerError(
          'Ein Fehler ist aufgetreten. Ihre E-Mail konnte nicht verifiziert werden. Evtl. wurde Ihr Konto auch schon aktiviert.'
        );
      }
    };
    verifyUser();
  }, []);

  return (
    <ContentPageWrapper>
      <StyledHeading>
        {serverError
          ? 'Dein Account konnte leider nicht aktiviert werden!'
          : 'Super, dein Account ist aktiviert'}
      </StyledHeading>

      <VerifyImage src={verifyImage} />

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
