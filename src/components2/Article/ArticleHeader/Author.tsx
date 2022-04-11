import React from 'react';
import { FormattedMessage } from 'react-intl';

type AuthorProps = {
  name?: string;
  className?: string;
};

export const Author: React.FC<AuthorProps> = ({ name = '', className }) => (
  <span className={className}>
    <FormattedMessage
      id="components.article.attribution"
      defaultMessage="von"
    />{' '}
    <strong>{name}</strong>
  </span>
);
