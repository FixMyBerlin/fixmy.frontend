import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Link from '~/components/Link';
import ContentPageWrapper from '~/components/ContentPageWrapper';
import UserForm from '~/pages/User/components/UserForm';
import { login } from '~/pages/User/UserState';

const StyledLink = styled(Link)`
  margin-top: 16px;
  display: block;
`;

const formConfig = [
  { id: 'email', value: '', type: 'email', label: 'E-Mail', placeholder: 'E-Mail eingeben...', validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.' },
  { id: 'password', value: '', type: 'password', label: 'Passwort', placeholder: 'Passwort eingeben...', validateError: 'Bitte geben Sie Ihr Passwort an.' }
];

class Login extends PureComponent {
  onSubmit = (values, params) => {
    this.props.dispatch(login(values, params));
  }

  render() {
    return (
      <ContentPageWrapper>
        <UserForm
          title="Login"
          buttonLabel="Einloggen"
          formConfig={formConfig}
          onSubmit={this.onSubmit}
        />
        <StyledLink to={config.routes.passwordReset}>
          Passwort vergessen?
        </StyledLink>
        <StyledLink to={config.routes.signup}>
          Ich habe noch keinen einen Account
        </StyledLink>
      </ContentPageWrapper>
    );
  }
}

export default connect(state => state.UserState)(Login);
