import React from 'react';
import { FormattedDate } from 'react-intl';

type PublishDateProps = {
  date?: Date;
  className?: string;
};

export const PublishDate = ({ date, className }: PublishDateProps) => (
  <span className={className}>
    <FormattedDate value={date} year="numeric" month="long" day="numeric" />
  </span>
);
