import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import UserForm from '~/pages/User/components/UserForm';
import { resetPassword } from '~/pages/User/UserState';

const formConfig = [
  { id: 'email', value: '', type: 'email', label: 'E-Mail', placeholder: 'E-Mail eingeben...', validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.' }
];

class Login extends PureComponent {
  onSubmit = (values, params) => {
    this.props.dispatch(resetPassword(values, params));
  }

  render() {
    return (
      <ContentPageWrapper>
        <UserForm
          title="Passwort zurücksetzen"
          formConfig={formConfig}
          onSubmit={this.onSubmit}
        />
      </ContentPageWrapper>
    );
  }
}

export default connect(state => state.UserState)(Login);
