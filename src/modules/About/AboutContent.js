import React from 'react';
import styled from 'styled-components';
import { If } from 'react-extras';
import Markdown from 'react-markdown';

const AboutContent = styled.div`
  padding: 1rem 2rem;
`;

export default props => (
  <AboutContent>
    <If
      condition={typeof props.content === 'string'}
      render={() => (
        <Markdown source={props.content} />
      )}
    />
  </AboutContent>
);
