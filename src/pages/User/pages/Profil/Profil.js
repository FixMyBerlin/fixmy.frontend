import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import UserForm from '~/pages/User/components/UserForm';
import { update } from '~/pages/User/UserState';

const formConfig = [
  { id: 'email', value: '', type: 'email', label: 'E-Mail', placeholder: 'E-Mail eingeben...', validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.' },
  { id: 'username', value: '', type: 'text', label: 'Nutzername', placeholder: 'Nutzernamen eingeben...', validateError: 'Bitte geben Sie einen Nutzernamen an.' },
  { id: 'password', value: '', type: 'password', label: 'Passwort', placeholder: 'Passwort eingeben...', validateError: 'Bitte geben Sie Ihr Passwort an.' }
];

class Signup extends PureComponent {
  onSubmit = (values, params) => {
    this.props.dispatch(update(values, params));
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
      </ContentPageWrapper>
    );
  }
}

export default connect(state => state.UserState)(Signup);
