import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import idx from 'idx';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import UserForm from '~/pages/User/components/UserForm';
import { resetPassword } from '~/pages/User/UserState';

const formConfig = [
  { id: 'password', value: '', type: 'password', label: 'Passwort', placeholder: 'Neues Passwort eigeben...', validateError: 'Bitte geben Sie ein neues Passwort an.' }
];

class ResetPassword extends PureComponent {
  onSubmit = (values, params) => {
    const matchParams = idx(this.props, _ => _.match.params);

    if (!matchParams || !matchParams.token || !matchParams.uid || !values.password) {
      return false;
    }

    const { password } = values;
    const { uid, token } = matchParams;

    this.props.dispatch(resetPassword({ password, uid, token }, params));
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

export default connect(state => state.UserState)(ResetPassword);
