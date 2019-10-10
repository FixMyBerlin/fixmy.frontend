import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ContentContainer = styled.div`
  opacity: 0.8;
  border-radius: 4px;
  background-color: #ffffff;
  font-weight: bold;
  font-size: 10px;
  color: ${config.colors.darkgrey};
  padding: 6px;
`;

const TradeMark = styled.span`
  color: ${config.colors.interaction};
`;

export default () => (
  <Wrapper>
    <ContentContainer>
      Ein Angebot von <TradeMark>FixMyBerlin</TradeMark>
    </ContentContainer>
  </Wrapper>
);
