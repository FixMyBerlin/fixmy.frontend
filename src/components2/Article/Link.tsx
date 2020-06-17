import React from 'react';
import styled from 'styled-components';

import Arrow from '~/images/arrow-icon.svg';

const Wrapper = styled.span`
  white-space: nowrap;

  a {
    margin-left: 3px;
    display: inline-block;
  }
`;

interface LinkProps {
  href: string;
  children: React.ReactNode;
}

export default ({ href, children }: LinkProps) => {
  return (
    <Wrapper>
      <Arrow />
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </Wrapper>
  );
};
