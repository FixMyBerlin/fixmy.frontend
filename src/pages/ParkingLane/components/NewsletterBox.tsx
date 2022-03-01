import React from 'react';
import { NewsletterWidget } from '~/components2/NewsletterWidget';
import { isSmallScreen } from '~/styles/utils';

export const NewsletterBox = () => {
  const isMobile = isSmallScreen();

  return (
    <NewsletterWidget
      height={isMobile ? 520 : 400}
      embedUrl="https://app.mailjet.com/widget/iframe/2YIa/KVM"
    />
  );
};
