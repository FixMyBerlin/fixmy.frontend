import styled from 'styled-components';

import config from '~/config';
import { media } from '~/styles/utils';

export const Paragraph = styled.div`
  font-family: ${config.baseFont};
  font-weight: 400;
  line-height: 1.35;
  margin: 1em auto;
  max-width: 518px;

  ${media.s`
    line-height: 1.5;
  `}

  ${media.l`
    max-width: 598px;
  `}
`;

export const Paragraph2Cols = styled(Paragraph)`
  ${media.m`
    column-count: 2;
    margin: 1em 0;
    max-width: none;
    width: 100%;
  `}
`;
