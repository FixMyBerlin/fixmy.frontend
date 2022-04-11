import React from 'react';
import styled from 'styled-components';
import Button from '~/components/Button';
import config from '~/config';

const FloatingWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${config.colors.darkbg};
  z-index: 99999999999999;
  padding: 8px 12px;
  color: ${config.colors.white};
`;

const Heading = styled.h2`
  color: ${config.colors.error};
`;

const StyledDismissButton = styled(Button)`
  float: right;
`;

type Props = {
  title?: string;
  dismissMessage?: string;
  onDismiss?: () => void;
  children: React.ReactNode;
};

export const ErrorMessage: React.FC<Props> = ({
  title = 'Fehler',
  dismissMessage = 'OK',
  onDismiss,
  children,
}) => (
  <FloatingWrapper>
    <Heading>{title}</Heading>
    {typeof children === 'string' ? <p>{children}</p> : children}
    {onDismiss && (
      <StyledDismissButton onClick={onDismiss}>
        {dismissMessage}
      </StyledDismissButton>
    )}
  </FloatingWrapper>
);
