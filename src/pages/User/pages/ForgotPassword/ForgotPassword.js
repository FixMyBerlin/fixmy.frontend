import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Link from '~/components/Link';
import ContentPageWrapper from '~/components/ContentPageWrapper';
import Button from '~/components/Button';
import UserForm from '~/pages/User/components/UserForm';
import { forgotPassword } from '~/pages/User/UserState';

const formConfig = [
  { id: 'email', value: '', type: 'email', label: 'E-Mail', placeholder: 'E-Mail eingeben...', validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.' }
];

class ForgotPassword extends PureComponent {
  state = {
    forgotPasswordSuccess: false
  }

  onSubmit = (values, params) => {
    this.props.dispatch(forgotPassword(values, params));
    this.setState({ forgotPasswordSuccess: true });
  }

  render() {
    return (
      <ContentPageWrapper>
        {this.state.forgotPasswordSuccess ? (
          <div>
            <div>Wir haben eine E-Mail zum zurücksetzen des Passworts geschickt.</div>
            <Link to="/anmelden"><Button>Zurück zum Login</Button></Link>
          </div>
        ) : (
          <UserForm
            title="Passwort zurücksetzen"
            formConfig={formConfig}
            onSubmit={this.onSubmit}
          />
        )}
      </ContentPageWrapper>
    );
  }
}

export default connect(state => state.UserState)(ForgotPassword);
