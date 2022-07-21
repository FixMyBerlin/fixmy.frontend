import React from 'react';

type AuthorProps = {
  name: string;
  className?: string;
};

export const Author: React.VFC<AuthorProps> = ({ name, className }) => (
  <span className={className}>
    von <strong>{name}</strong>
  </span>
);
