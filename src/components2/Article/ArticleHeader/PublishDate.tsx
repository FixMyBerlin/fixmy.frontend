import React from 'react';

interface PublishDateProps {
  date?: Date;
  className?: string;
}

function isDate(date: Date) {
  return (
    date && typeof date === 'object' && typeof date.getMonth === 'function'
  );
}

function formatPublishDate(date: Date) {
  if (!isDate(date)) {
    return null;
  }

  return date.toLocaleString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
}

export default ({ date, className }: PublishDateProps) => (
  <span className={className}>{formatPublishDate(date)}</span>
);
