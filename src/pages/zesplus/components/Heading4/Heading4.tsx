import React from 'react';
import { Paragraph } from '~/components2/Article';

type Props = { children: React.ReactNode };

export const Heading4: React.FC<Props> = ({ children }) => {
  return (
    <Paragraph>
      <h4>
        <strong>{children}</strong>
      </h4>
    </Paragraph>
  );
};
