import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import config from '~/config';
import Link from '~/components/Link';
import ExternalLink from '~/components/ExternalLink';
import ContentPageWrapper from '~/components/ContentPageWrapper';
import UserForm from '~/pages/User/components/UserForm';
import { signup } from '~/pages/User/UserState';

const StyledLink = styled(Link)`
  margin-top: 16px;
  display: inline-block;
`;

const formConfig = [
  {
    id: 'username',
    value: '',
    type: 'email',
    label: 'E-Mail',
    placeholder: 'E-Mail eingeben...',
    validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.'
  },
  {
    id: 'password',
    value: '',
    type: 'password',
    label: 'Passwort',
    placeholder: 'Passwort eingeben...',
    validateError: 'Bitte geben Sie Ihr Passwort an.'
  },
  // { id: 'newsletter', value: false, type: 'checkbox', label: 'Newsletter bestellen' }
  {
    id: 'privacy',
    value: false,
    type: 'checkbox',
    label: (
      <span>
        Ja, ich stimme zu, dass FixMyBerlin meine Daten speichert und verwendet.
        Die{' '}
        <ExternalLink
          href="https://fixmyberlin.de/datenschutz"
          rel="noopener noreferrer"
          target="_blank"
        >
          Datenschutzerklärung
        </ExternalLink>{' '}
        habe ich gelesen.
      </span>
    ),
    validateError:
      'Sie müssen die Datenschutzbedingungen akzeptieren um sich zu registrieren.'
  }
];

class Signup extends PureComponent {
  onSubmit = (values, params) => {
    const post = {
      ...values,
      email: values.username
    };

    this.props.dispatch(signup(post, params));
  };

  render() {
    return (
      <ContentPageWrapper>
        <UserForm
          title="Registrieren"
          buttonLabel="Anmelden"
          formConfig={formConfig}
          onSubmit={this.onSubmit}
        />
        <StyledLink to={config.routes.login}>
          Ich habe bereits einen Account
        </StyledLink>
      </ContentPageWrapper>
    );
  }
}

export default connect((state) => state.UserState)(Signup);
