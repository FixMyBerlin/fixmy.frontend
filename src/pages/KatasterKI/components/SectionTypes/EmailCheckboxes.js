import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

import { media } from '~/styles/utils';
import Flex from '~/components/Flex';
import Button from '~/pages/KatasterKI/components/Button';
import GhostButton from '~/pages/KatasterKI/components/GhostButton';
import QuestionTitle from '~/pages/KatasterKI/components/QuestionTitle';
import Input from '~/pages/KatasterKI/components/Input';
import Paragraph from '~/pages/KatasterKI/components/Paragraph';
import useHandlerTimeout from '~/pages/KatasterKI/hooks/useHandlerTimeout';
import Checkbox from '~/pages/KatasterKI/components/Checkbox';

import api from '~/pages/KatasterKI/api';
import { signupTSPNewsletter } from '~/pages/KatasterKI/utils';

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

const initialNewsletterConfig = [
  {
    id: 'fixmy-newsletter',
    label: 'Ich möchte außerdem den FixMyBerlin-Newsletter erhalten.',
    checked: false
  },
  {
    id: 'tsp-newsletter',
    label:
      'Ich wünsche mir weitere interessante Angebote der Tagesspiegel-Gruppe per Email.',
    checked: false
  }
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
      newsletter: shouldSignupFMCNewsletter
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
              Sobald Sie den Link aktiviert haben, bekommen Sie eine Email, wenn
              Auswertungen der Umfrage online sind.
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
      <QuestionTitle>
        Tragen Sie hier Ihre Emailadresse ein, wenn Sie möchten, dass der
        Tagesspiegel und FixMyBerlin Sie über die Ergebnisse der Umfrage
        informieren.
      </QuestionTitle>

      <EmailWrapper>
        <Flex css={{ flexGrow: 1 }} alignItems="center" flexDirection="column">
          <Input
            type="email"
            placeholder="Ihre E-Mailadresse"
            onChange={(evt) => handleUpdate(evt.target.value)}
            value={email}
            css={{ marginBottom: '2em' }}
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
                <div>{option.label}</div>
              </label>
            </CheckboxWrapper>
          ))}

          <Button
            css={{ marginTop: 20 }}
            disabled={!isEmailValid}
            onClick={onClick}
            isLoading={isLoading}
          >
            Absenden
          </Button>

          <GhostButton css={{ marginTop: 'auto' }} onClick={props.next}>
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
