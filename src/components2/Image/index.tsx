/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { breakpoints, media } from '~/styles/utils';

export const Insert = styled.img`
  width: 100vw;
  max-width: ${breakpoints.m}px;
  height: auto;
  margin-left: -16px;

  ${media.m`
    margin-left: initial;
  `}
`;
