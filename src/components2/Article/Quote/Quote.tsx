import React from 'react';
import styled from 'styled-components';

import { media } from '~/styles/utils';

type Props = {
  sourceText?: string;
  long?: boolean;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: 518px;
  margin: 1em auto 1.8em auto;

  ${media.m`
    margin: 3em auto 3.8em auto;
  `}

  ${media.l`
    max-width: 598px;
  `}
`;

const QuoteStyle = styled.div`
  background: white;
  box-shadow: 2px 6px 60px 0 rgba(0, 0, 0, 0.09);
  padding: ${(props: Props) =>
    props.long && props.sourceText ? '2.5em' : '1.5em'};
  font-size: ${(props: Props) => (props.long ? '1em' : '1.5em')};
  font-style: italic;
  font-weight: 600;
  line-height: 1.5em;
  border-radius: 6px;
`;

const Attribution = styled.div`
  align-self: center;
  background: #cf0a7d;
  border-radius: 3px;
  color: white;
  display: inline;
  font-size: 0.875em;
  font-style: normal;
  font-weight: 700;
  line-height: 1.25;
  padding: 11px 22px;
  transform: translateY(-50%);
`;

export const Quote: React.FC<Props> = ({ sourceText, children }, ...props) => (
  <Wrapper>
    <QuoteStyle {...props}>{children}</QuoteStyle>
    {sourceText && <Attribution {...props}>{sourceText}</Attribution>}
  </Wrapper>
);
