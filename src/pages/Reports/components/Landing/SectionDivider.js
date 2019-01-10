import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'react-feather';


const SectionDivider = styled.div`
  width: 100%;
  height: 0;
  display: flex;
  justify-content: center;
`;

const StyledChevron = styled(ChevronDown)`
  background-color: ${config.colors.darkbg};
  width: 48px;
  height: 48px;
  bottom: 24px;
  border-radius: 48px;
  color: white;
  position: relative;
  box-shadow: 0 3px 4px rgba(53,53,53, 0.8);
`;


export default () => (
  <SectionDivider>
    <StyledChevron />
  </SectionDivider>
);
