import React from 'react';
import { If } from 'react-extras';
import Markdown from 'react-markdown';

export default props => (
  <If
    condition={typeof props.content === 'string'}
    render={() => (
      <Markdown source={props.content} />
    )}
  />
);
