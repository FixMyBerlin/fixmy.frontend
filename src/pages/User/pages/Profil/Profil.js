import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import Title from '~/components/Title';
import Text from '~/components/Text';
import Button from '~/components/Button';
import UserForm from '~/pages/User/components/UserForm';
import { update, logout, profile } from '~/pages/User/UserState';

const formConfigUserName = [
  { id: 'new_username', value: '', type: 'email', label: 'E-Mail', placeholder: 'E-Mail eingeben...', validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.' },
  { id: 'current_password', value: '', type: 'password', label: 'Aktuelles Passwort', placeholder: 'Passwort eingeben...', validateError: 'Bitte geben Sie Ihr aktuelles Passwort an.' }
];

const formConfigPassword = [
  { id: 'new_password', value: '', type: 'password', label: 'Neues Passwort', placeholder: 'Neues Passwort eingeben...', validateError: 'Bitte geben Sie ein neues Passwort an.' },
  { id: 'current_password', value: '', type: 'password', label: 'Aktuelles Passwort', placeholder: 'Passwort eingeben...', validateError: 'Bitte geben Sie ihr aktuelles Passwort an.' }
];

const StyledButton = styled(Button)`
  margin: 16px 0 0 0;
  background: ${config.colors.change_4};
`;

class Signup extends PureComponent {
  componentDidMount() {
    this.props.dispatch(profile());
  }

  onSubmit = (values, params) => {
    this.props.dispatch(update(values, params));
  }

  onLogout = () => {
    this.props.dispatch(logout());
  }

  render() {
    const { userData } = this.props;
    if (!userData.username) {
      return null;
    }

    // here we add the data from the server to the form data
    formConfigUserName[0].value = userData.username;
    formConfigUserName[1].value = '';

    const formConfigPasswordCleared = formConfigPassword.map(d => ({ ...d, value: '' }));

    return (
      <ContentPageWrapper>
        <Title>Profil</Title>
        <Text>Hier kannst du deine E-Mail Adresse und Passwort ändern.</Text>
        <UserForm
          buttonLabel="E-Mail ändern"
          formConfig={formConfigUserName}
          onSubmit={this.onSubmit}
        />
        <UserForm
          buttonLabel="Passwort ändern"
          formConfig={formConfigPasswordCleared}
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
