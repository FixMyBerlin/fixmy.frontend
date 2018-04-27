import React from 'react';
import SocialWrapper from './SocialWrapper';
import SocialTitle from './SocialTitle';
import SocialButtonWrapper from './SocialButtonWrapper';
import SocialButton from './SocialButton';

export default props => (
  <SocialWrapper>
    <SocialTitle>{props.title}</SocialTitle>
    <SocialButtonWrapper>
      <SocialButton type="facebook" link="http://www.facebook.com/sharer.php?u=https://fixmyberlin.de" />
      <SocialButton type="twitter" link="http://twitter.com/home?status=FixMyBerlin,+gemeinsam+zur+Fahrradstadt+Berlin%3A+https%3A%2F%2Ffixmyberlin.de" />
    </SocialButtonWrapper>
  </SocialWrapper>
);
