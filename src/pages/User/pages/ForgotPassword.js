import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import { forgotPassword } from '~/pages/User/UserState';
import UserForm from '~/pages/User/components/UserForm';

const formConfig = [
  {
    id: 'email',
    value: '',
    type: 'email',
    label: 'E-Mail',
    placeholder: 'E-Mail eingeben...',
    validateError: 'Bitte geben Sie Ihre E-Mail Adresse an.',
  },
];

class ForgotPassword extends PureComponent {
  onSubmit = (values, params) => {
    this.props.dispatch(forgotPassword(values, params));
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

export default connect((state) => state.UserState)(ForgotPassword);
