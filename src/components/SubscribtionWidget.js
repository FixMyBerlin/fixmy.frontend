import React from 'react';
import styled from 'styled-components';

const StyledWidget = styled.div`

`;

export default () => (
  <StyledWidget>
    <iframe
      title="Mailjet Form"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      src={config.newsletterWidgetUrl}
      width="100%"
      height="120"
    />
  </StyledWidget>
);
