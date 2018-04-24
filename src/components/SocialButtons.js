import React from 'react';
import styled from 'styled-components';

import FbIcon from '~/images/facebook.svg';
import TwIcon from '~/images/twitter.svg';

const SocialWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SocialButton = styled.div`
  margin: 0 10px;
`;

export default () => (
  <SocialWrapper>
    <SocialButton>
      <img alt="" src={FbIcon} />
    </SocialButton>
    <SocialButton>
      <img alt="" src={TwIcon} />
    </SocialButton>
  </SocialWrapper>
);
