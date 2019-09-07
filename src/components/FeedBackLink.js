import React from 'react';
import Link from './Link';

const Anchor = Link
  .withComponent('a')
  .attrs(() => ({
    href: `mailto:${config.feedbackMailAddress}?subject=Feedback`
  }));

export default () => (
  <Anchor>{config.feedbackMailAddress}</Anchor>
);
