import React from 'react';
import { If } from 'react-extras';
import styled from 'styled-components';
import Markdown from 'react-markdown';
import { getHeadlineStyle } from '~/components/Headline';

const ImageContext = require.context('~/images', true);

const StyledMarkdown = styled(Markdown)`
  padding-bottom: 100px;

  h1 {
    ${getHeadlineStyle()}
    padding: 0;
    margin-bottom: 2rem;
    margin-top: 2rem;
    text-align: center;
    border-bottom: 1px dashed ${config.colors.midgrey};
    padding-bottom: 1rem;
  }

  h2, h3, h4, h5 {
    font-weight: 300;
    color: ${config.colors.black};
    font-size: 22px;
    line-height: 1.3;
    margin: 20px 0;
  }

  p, li {
    font-size: 14px;
    color: ${config.colors.darkgrey};
    line-height: 1.4;
  }
`;

function loadImage(mdSrc) {
  return ImageContext(mdSrc);
}

export default props => (
  <If
    condition={typeof props.content === 'string'}
    render={() => (
      <StyledMarkdown escapeHtml={false} transformImageUri={loadImage} source={props.content} />
    )}
  />
);
