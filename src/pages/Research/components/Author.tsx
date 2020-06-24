import React from 'react';

interface AuthorProps {
  name?: string;
  className?: string;
}

export default ({ name = '', className }: AuthorProps) => (
  <span className={className}>
    von <strong>{name}</strong>
  </span>
);
