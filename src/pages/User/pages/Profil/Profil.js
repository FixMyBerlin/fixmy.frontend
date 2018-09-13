import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import Button from '~/components/Button';
import UserForm from '~/pages/User/components/UserForm';
import { update, logout } from '~/pages/User/UserState';

const formConfig = [
  { id: 'email', value: '', type: 'email', label: 'E-Mail', placeholder: 'E-Mail eingeben...', validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.' },
  { id: 'password', value: '', type: 'password', label: 'Passwort', placeholder: 'Passwort eingeben...', validateError: 'Bitte geben Sie Ihr Passwort an.' }
];

const StyledButton = styled(Button)`
  margin-top:16px;
`;

class Signup extends PureComponent {
  onSubmit = (values, params) => {
    this.props.dispatch(update(values, params));
  }

  onLogout = () => {
    this.props.dispatch(logout());
  }

  render() {
    return (
      <ContentPageWrapper>
        <UserForm
          title="Profil"
          buttonLabel="Änderungen speichern"
          formConfig={formConfig}
          onSubmit={this.onSubmit}
        />
        <StyledButton onClick={this.onLogout}>
          Ausloggen
        </StyledButton>
      </ContentPageWrapper>
    );
  }
}

export default connect(state => state.UserState)(Signup);
