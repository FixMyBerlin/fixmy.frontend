import styled from 'styled-components';
import { media } from '~/styles/utils';
import { Paragraph } from './Paragraph';

type Props = React.FC & { displayName?: string };

export const Intro: Props = styled(Paragraph)`
  font-weight: 700;
  line-height: 1.3;

  ${media.s`
    line-height: 1.5;
  `}

  ${media.m`
    margin: 2em auto;
  `};
`;

Intro.displayName = 'Article/Typography/Intro';
