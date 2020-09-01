import React from 'react';
import { FormattedDate, FormattedTime } from 'react-intl';

interface PublishDateProps {
  date?: Date;
  className?: string;
}

const PublishDate = ({ date, className }: PublishDateProps) => (
  <span className={className}>
    <FormattedDate value={date} year="numeric" month="long" day="numeric" />{' '}
    <FormattedTime value={date} hour="numeric" minute="numeric" />
  </span>
);

export default PublishDate;
