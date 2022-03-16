import React from 'react';
import styled from 'styled-components';
import { Paragraph } from './Paragraph';

type Props = { summary: string; style?: React.CSSProperties };

const StyledSummary = styled.summary`
  cursor: pointer;
`;

export const Details: React.FC<Props> = ({ summary, style, children }) => {
  return (
    <Paragraph as="details" style={style}>
      <StyledSummary>
        <strong>{summary}</strong>
      </StyledSummary>
      {children}
    </Paragraph>
  );
};
