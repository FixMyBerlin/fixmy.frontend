import React from 'react';
import styled from 'styled-components';
import { media } from '~/styles/utils';

import Faq from '.';
import FaqItem from './FaqItem';

const Wrapper = styled.div`
  max-width: 568px;
  margin: 0 auto;
  padding: 0 16px;

  ${media.m`
  padding: 0 24px;
`}
`;

export default {
  title: 'Meldungen / Landing / FAQs',
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>]
};

export const Full = () => <Faq />;

export const Entry = () => <FaqItem />;

export const EntryOpen = () => <FaqItem open />;

export const CustomContent = () => (
  <FaqItem heading="Custom heading" text="Custom text" open />
);
