import React, { PureComponent } from 'react';
import styled from 'styled-components';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import Title from '~/components/Title';
import Text from '~/components/Text';
import Link from '~/components/Link';

const StyledLink = styled(Link)`
  margin-top: 16px;
  display: inline-block;
`;

class EmailVerification extends PureComponent {
  render() {
    return (
      <ContentPageWrapper>
        <Title>Willkommen bei FixMyBerlin!</Title>
        <Text>Ihre E-Mail wurde erfolgreich verifiziert.</Text>
        <StyledLink to="/login">Zum Login</StyledLink>
      </ContentPageWrapper>
    );
  }
}

export default EmailVerification;
