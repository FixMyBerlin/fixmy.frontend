import React from 'react';
import { FormattedDate } from 'react-intl';

type PublishDateProps = {
  date?: Date;
  className?: string;
};

export const PublishDate: React.VFC<PublishDateProps> = ({
  date,
  className,
}) => (
  <span className={className}>
    <FormattedDate value={date} year="numeric" month="long" day="numeric" />
  </span>
);
