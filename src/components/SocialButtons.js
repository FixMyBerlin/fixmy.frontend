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
    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/fixmyberlin">
      <SocialButton>
        <img alt="" src={FbIcon} />
      </SocialButton>
    </a>
    <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/fixmyberlin">
      <SocialButton>
        <img alt="" src={TwIcon} />
      </SocialButton>
    </a>
  </SocialWrapper>
);
