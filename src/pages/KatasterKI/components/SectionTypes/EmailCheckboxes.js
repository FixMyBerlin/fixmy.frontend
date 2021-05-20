import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

import Flex from '~/components/Flex';
import emailImageSrc from '~/images/reports/letter.png';
import api from '~/pages/KatasterKI/api';
import Button from '~/pages/KatasterKI/components/Button';
import Checkbox from '~/pages/KatasterKI/components/Checkbox';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import Input from '~/pages/KatasterKI/components/Input';
import Paragraph from '~/pages/KatasterKI/components/Paragraph';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import config from '~/pages/KatasterKI/config';
import useHandlerTimeout from '~/pages/KatasterKI/hooks/useHandlerTimeout';
import { signupTSPNewsletter } from '~/pages/KatasterKI/utils';
import { media } from '~/styles/utils';

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

const CheckboxWrapper = styled.div`
  margin-bottom: 1em;
  width: 100%;
  font-size: 14px;
  color: ${config.colors.midgrey};

  label {
    cursor: pointer;
    user-select: none;
    display: flex;
  }
`;

const CheckboxLabel = styled.div`
  line-height: 1.3em;
`;

const TSPPrivacyLink = () => (
  <a
    href="https://www.tagesspiegel.de/service/verlag-der-tagesspiegel-datenschutz\
erklaerung/22603436.html"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: config.colors.midgrey }}
  >
    Datenschutzerklärung
  </a>
);

const initialNewsletterConfig = [
  {
    id: 'tsp-newsletter',
    label: `Ich möchte kostenlos den Tagesspiegel Checkpoint abonnieren. Dort \
wird auch über die Ergebnisse der Umfrage berichtet.`,
    checked: false,
  },
  {
    id: 'fixmy-newsletter',
    label: 'Ich möchte außerdem den FixMyBerlin-Newsletter erhalten.',
    checked: false,
  },
];

/**
 * Return true if param email is a valid e-mail address
 *
 * @param {string} email Address to be tested
 */
const checkEmail = (email) => /(.+)@(.+){2,}\.(.+){2,}/.test(email);

const Email = (props) => {
  if (!props.isTosAccepted) {
    return <Redirect to={config.routes.katasterKI.landing} />;
  }

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValid] = useState(checkEmail(email));
  const [newsletterOptions, setNewsletterOptions] = useState(
    initialNewsletterConfig
  );

  const handleUpdate = (value) => {
    setEmail(value);
    setEmailValid(checkEmail(value));
  };

  const handleSend = () => {
    setEmailSent(true);

    const shouldSignupFMCNewsletter = newsletterOptions.find(
      (opt) => opt.id === 'fixmy-newsletter'
    ).checked;
    api.submitNewsletter({
      email,
      username: email,
      password: uuidv4(),
      newsletter: shouldSignupFMCNewsletter,
    });

    const shouldSignupTSP = newsletterOptions.find(
      (opt) => opt.id === 'tsp-newsletter'
    ).checked;

    if (shouldSignupTSP) signupTSPNewsletter(email);
  };

  const onToggle = (evt) => {
    const { name } = evt.target;

    setNewsletterOptions((options) =>
      options.map((option) => {
        if (option.id === name) {
          return { ...option, checked: !option.checked };
        }
        return option;
      })
    );
  };

  const [isLoading, onClick] = useHandlerTimeout(handleSend);

  if (emailSent) {
    return (
      <>
        <QuestionTitle>{props.thankyou}</QuestionTitle>

        <EmailWrapper>
          <Flex
            css={{ flexGrow: 1 }}
            alignItems="center"
            flexDirection="column"
          >
            <EmailImg />
            <Paragraph>
              Sobald Sie den Link aktiviert haben, bekommen Sie eine E-Mail,
              wenn Auswertungen der Umfrage online sind.
            </Paragraph>
            <Button css={{ marginTop: 'auto' }} onClick={props.next}>
              Weiter in der Umfrage
            </Button>
          </Flex>
        </EmailWrapper>
      </>
    );
  }

  return (
    <>
      <QuestionTitle>{props.title}</QuestionTitle>

      <EmailWrapper>
        <Flex css={{ flexGrow: 1 }} alignItems="center" flexDirection="column">
          <Input
            type="email"
            placeholder={props.placeholder}
            onChange={(evt) => handleUpdate(evt.target.value)}
            value={email}
            css={{ marginBottom: '2em' }}
            data-cy="kat-emailcheckboxes-input"
          />

          {newsletterOptions.map((option) => (
            <CheckboxWrapper key={option.id}>
              <label htmlFor={option.id}>
                <Checkbox
                  type="checkbox"
                  name={option.id}
                  id={option.id}
                  checked={option.checked}
                  onChange={onToggle}
                />
                <CheckboxLabel>
                  {option.label}{' '}
                  {option.id === 'tsp-newsletter' && <TSPPrivacyLink />}
                </CheckboxLabel>
              </label>
            </CheckboxWrapper>
          ))}

          <Button
            css={{ marginTop: 20 }}
            disabled={!isEmailValid}
            onClick={onClick}
            isLoading={isLoading}
            data-cy="kat-emailcheckboxes-submit-btn"
          >
            Absenden
          </Button>

          <GhostButton
            css={{ marginTop: 'auto' }}
            onClick={props.next}
            data-cy="kat-emailcheckboxes-proceed-btn"
          >
            Weiter in der Umfrage
          </GhostButton>
        </Flex>
      </EmailWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  isTosAccepted: state.KatasterKIState.isTosAccepted,
});

export default connect(mapStateToProps)(Email);
