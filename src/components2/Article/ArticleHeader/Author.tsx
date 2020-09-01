import React from 'react';
import { FormattedMessage } from 'react-intl';

interface AuthorProps {
  name?: string;
  className?: string;
}

export default ({ name = '', className }: AuthorProps) => (
  <span className={className}>
    <FormattedMessage
      id="components.article.attribution"
      defaultMessage="von"
    />{' '}
    <strong>{name}</strong>
  </span>
);
