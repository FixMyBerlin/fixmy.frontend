import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import { resetPassword } from '~/pages/User/UserState';
import UserForm from '~/pages/User/components/UserForm';

const formConfig = [
  {
    id: 'password',
    value: '',
    type: 'password',
    label: 'Passwort',
    placeholder: 'Neues Passwort eigeben...',
    validateError: 'Bitte geben Sie ein neues Passwort an.',
  },
];

class ResetPassword extends PureComponent {
  onSubmit = (values, params) => {
    const matchParams = this.props?.match?.params;

    if (
      !matchParams ||
      !matchParams.token ||
      !matchParams.uid ||
      !values.password
    ) {
      return false;
    }

    const { password } = values;
    const { uid, token } = matchParams;

    return this.props.dispatch(
      resetPassword({ new_password: password, uid, token }, params)
    );
  };

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

export default connect((state) => state.UserState)(ResetPassword);
