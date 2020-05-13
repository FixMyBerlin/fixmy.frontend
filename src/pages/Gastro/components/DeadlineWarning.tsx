import React from 'react';
import styled from 'styled-components';

const Highlight = styled.p`
  margin-top: -1em;
  color: #cf0a7d;
  margin-botom: 2em;
  font-weight: bold;
  span {
    white-space: nowrap;
  }
`;

const DeadlineWarning = () => (
  <Highlight>
    Bitte füllen Sie das Formular bis zum Sonntag, den 17. Mai 2020 um 22 Uhr
    aus.
  </Highlight>
);

export default DeadlineWarning;
