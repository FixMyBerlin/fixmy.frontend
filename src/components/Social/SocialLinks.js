import React from 'react';
import SocialWrapper from './SocialWrapper';
import SocialTitle from './SocialTitle';
import SocialButtonWrapper from './SocialButtonWrapper';
import SocialButton from './SocialButton';

export default props => (
  <SocialWrapper>
    <SocialTitle>{props.title}</SocialTitle>
    <SocialButtonWrapper>
      <SocialButton type="twitter" link="https://twitter.com/fixmyberlin" />
    </SocialButtonWrapper>
  </SocialWrapper>
);
