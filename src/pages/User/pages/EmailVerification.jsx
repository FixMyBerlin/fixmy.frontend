import React, { PureComponent } from 'react';
import styled from 'styled-components';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import Link from '~/components/Link';
import Text from '~/components/Text';
import Title from '~/components/Title';

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
