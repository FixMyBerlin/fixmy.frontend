import React from 'react';

import SocialButton from './SocialButton';
import SocialButtonWrapper from './SocialButtonWrapper';
import SocialTitle from './SocialTitle';
import SocialWrapper from './SocialWrapper';

export default (props) => (
  <SocialWrapper>
    <SocialTitle>{props.title}</SocialTitle>
    <SocialButtonWrapper>
      <SocialButton type="twitter" link="https://twitter.com/fixmyberlin" />
    </SocialButtonWrapper>
  </SocialWrapper>
);
