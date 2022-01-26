import React from 'react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';

import { getLinkStyles } from '~/components/Link';
import { getSectionTitleStyles } from '~/components/SectionTitle';
import { getTextStyles } from '~/components/Text';
import { getTitleStyles } from '~/components/Title';
import config from '~/config';

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

  h2,
  h3,
  h4,
  h5 {
    ${getSectionTitleStyles()}
  }

  p,
  li {
    ${getTextStyles()}
  }

  a {
    ${getLinkStyles()}
    color: ${config.colors.interaction};
    text-decoration: none;
  }

  img {
    max-width: 250px;
  }

  img.img-lg {
    max-width: initial;
    margin: 2em auto;
  }
`;

const MarkdownContent = ({ content }) =>
  content && typeof content === 'string' ? (
    <StyledMarkdown rehypePlugins={[rehypeRaw]}>{content}</StyledMarkdown>
  ) : null;

export default MarkdownContent;
