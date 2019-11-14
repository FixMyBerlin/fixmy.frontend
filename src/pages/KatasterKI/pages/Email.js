import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components/Button';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import Input from '~/pages/KatasterKI/components/Input';
import Paragraph from '~/pages/KatasterKI/components/Paragraph';
import useHandlerTimeout from '~/pages/KatasterKI/hooks/useHandlerTimeout';

import emailImageSrc from '~/images/reports/letter.png';

const EmailImg = styled.img.attrs({ src: emailImageSrc })`
  &&& {
    width: 140px;
    margin: 20px auto;
    display: block;
  }
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${media.m`
    margin-left: auto;
    margin-right: auto;
    width: 500px;
  `}
`;

const Email = (props) => {
  if (!props.isTosAccepted) {
    return <Redirect to={config.routes.katasterKI.landing} />;
  }

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  const onSend = () => {
    // @TODO: send email to mail provider after successfull response:
    setEmailSent(true);
  };

  const onOpenInfo = () => {
    window.location.href = config.routes.katasterKI.landing;
  };

  const [isLoading, onClick] = useHandlerTimeout(onSend);

  if (emailSent) {
    return (
      <>
        <QuestionTitle>
          Danke, wir haben Ihnen eine Email geschickt. Klicken Sie dort auf den
          Link zur Bestätigung.
        </QuestionTitle>

        <EmailWrapper>
          <Flex
            css={{ flexGrow: 1 }}
            alignItems="center"
            flexDirection="column"
          >
            <EmailImg />
            <Paragraph>
              Sobald Sie den Login aktiviert haben, bekommen Sie eine Email,
              wenn Auswertungen der Umfrage online sind.
            </Paragraph>
            <Button css={{ marginTop: 'auto' }} onClick={onOpenInfo}>
              Weiter in der Umfrage
            </Button>
          </Flex>
        </EmailWrapper>
      </>
    );
  }

  return (
    <>
      <QuestionTitle>
        Tragen Sie hier Ihre Emailadresse für den FixMyBerlin Newsletter ein,
        dann informieren wir Sie, sobald die Ergbnisse der Umfrage ausgewertet
        sind. (Optional)
      </QuestionTitle>

      <EmailWrapper>
        <Flex css={{ flexGrow: 1 }} alignItems="center" flexDirection="column">
          <Input
            type="email"
            placeholder="Deine E-Mailadresse"
            onChange={(evt) => setEmail(evt.target.value)}
            value={email}
          />
          <Button
            css={{ marginTop: 20 }}
            disabled={!email}
            onClick={onClick}
            isLoading={isLoading}
          >
            Absenden
          </Button>

          <GhostButton css={{ marginTop: 'auto' }} onClick={onOpenInfo}>
            Weiter in der Umfrage
          </GhostButton>
        </Flex>
      </EmailWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  isTosAccepted: state.KatasterKIState.isTosAccepted
});

export default connect(mapStateToProps)(Email);
