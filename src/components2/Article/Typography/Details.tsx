import React from 'react';
import styled from 'styled-components';
import { Paragraph } from './Paragraph';

type Props = { summary: string };

const StyledSummary = styled.summary`
  cursor: pointer;
`;

export const Details: React.FC<Props> = ({ summary, children }) => {
  return (
    <Paragraph>
      <details>
        <StyledSummary>
          <strong>{summary}</strong>
        </StyledSummary>
        {children}
      </details>
    </Paragraph>
  );
};
