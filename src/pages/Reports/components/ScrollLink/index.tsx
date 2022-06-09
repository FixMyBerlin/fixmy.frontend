import React from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line import/no-unresolved */
import ArrowIcon from '~/images/arrow-down.svg?component';

const ClickableArea = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: bold;
  line-height: 1.5;
  color: white;
`;

const Arrow = styled(ArrowIcon)`
  margin-bottom: 12px;
`;

function scrollDown() {
  window.scroll({ top: window.innerHeight, behavior: 'smooth' });
}

const ScrollLink = () => (
  <ClickableArea onClick={scrollDown}>
    <Text>mehr Infos</Text>
    <Arrow />
  </ClickableArea>
);

export default ScrollLink;
