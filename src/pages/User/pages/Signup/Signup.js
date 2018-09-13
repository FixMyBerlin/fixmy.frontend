import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Link from '~/components/Link';
import ContentPageWrapper from '~/components/ContentPageWrapper';
import UserForm from '~/pages/User/components/UserForm';
import { signup } from '~/pages/User/UserState';

const StyledLink = styled(Link)`
  margin-top: 16px;
  display: inline-block;
`;

const formConfig = [
  { id: 'email', value: '', type: 'email', label: 'E-Mail', placeholder: 'E-Mail eingeben...', validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.' },
  { id: 'password', value: '', type: 'password', label: 'Passwort', placeholder: 'Passwort eingeben...', validateError: 'Bitte geben Sie Ihr Passwort an.' },
  { id: 'newsletter', value: false, type: 'checkbox', label: 'Newsletter bestellen' }
];

class Signup extends PureComponent {
  onSubmit = (values, params) => {
    this.props.dispatch(signup(values, params));
  }

  render() {
    return (
      <ContentPageWrapper>
        <UserForm
          title="Anmelden"
          buttonLabel="Anmelden"
          formConfig={formConfig}
          onSubmit={this.onSubmit}
        />
        <StyledLink to="/anmelden">
          Ich habe bereits einen Account
        </StyledLink>
      </ContentPageWrapper>
    );
  }
}

export default connect(state => state.UserState)(Signup);
