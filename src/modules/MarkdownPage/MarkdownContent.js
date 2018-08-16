import React from 'react';
import styled from 'styled-components';
import Markdown from 'react-markdown';
import { getTitleStyles } from '~/components/styled/Title';
import { getSectionTitleStyles } from '~/components/styled/SectionTitle';
import { getTextStyles } from '~/components/styled/Text';

const ImageContext = require.context('~/images', true);

const StyledMarkdown = styled(Markdown)`
  padding-bottom: 100px;

  h1 {
    ${getTitleStyles()}
    padding: 0;
    margin-bottom: 2rem;
    margin-top: 2rem;
    text-align: center;
    border-bottom: 1px dashed ${config.colors.midgrey};
    padding-bottom: 1rem;
  }

  h2, h3, h4, h5 {
    ${getSectionTitleStyles()}
  }

  p, li {
    ${getTextStyles()}
  }
`;

function loadImage(mdSrc) {
  return ImageContext(mdSrc);
}

export default props => (
  typeof props.content === 'string' ?
    <StyledMarkdown escapeHtml={false} transformImageUri={loadImage} source={props.content} /> :
    null
);
