import React from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { media } from '~/styles/utils';
import Flex from '~/components/Flex';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';

import emailImageSrc from '~/images/reports/letter.png';

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

const Email = ({ title, next }) => {
  return (
    <>
      <QuestionTitle>{title}</QuestionTitle>

      <EmailWrapper>
        <Flex css={{ flexGrow: 1 }} alignItems="center" flexDirection="column">
          <iframe
            title="Mailjet Form"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://app.mailjet.com/widget/iframe/2YIa/6kW?v=4"
            width="100%"
            height="120"
            frameBorder="0"
          />

          <a
            href={config.katasterKI.tspNewsletterLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Hier können Sie weitere interessante Tagesspiegel-Newsletter
            abonnieren
          </a>

          <GhostButton css={{ marginTop: 'auto' }} onClick={next}>
            Weiter in der Umfrage
          </GhostButton>
        </Flex>
      </EmailWrapper>
    </>
  );
};

export default Email;
