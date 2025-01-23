import React from 'react';
import styled from 'styled-components';

import FbIcon from '~/images/facebook.svg';

const SocialButton = styled.div`
  margin: 0 10px;
`;

export default (props) => {
  let SocialIcon;

  switch (props.type) {
    case 'facebook':
    default:
      SocialIcon = FbIcon;
      break;
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Oeffne ${props.type}`}
      href={props.link}
    >
      <SocialButton>
        <SocialIcon />
      </SocialButton>
    </a>
  );
};
