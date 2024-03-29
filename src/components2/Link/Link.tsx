import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import config from '~/config';

import LinkExternal from './icon-external-link@2x.png';
import LinkInternal from './icon-internal-link@2x.png';

/**
 * Base style for creating elements that look like links
 *
 * @param elem HTML element to use as container
 */
export const BaseContainer = (elem: Parameters<typeof styled>[0]) => styled(
  elem
)`
  color: ${config.colors.darkbg};

  text-decoration: none;
  border: none;
  border-bottom: 1px solid ${config.colors.interaction};

  background: none;
  background-size: 9px 9px;
  background-repeat: no-repeat;
  background-position: center left;

  padding: 0;
  padding-left: 15px;

  /* make sure long anchors wrap */
  white-space: pre-wrap;

  &:hover {
    opacity: 0.8;
  }
`;

const InternalAnchorLink = styled(BaseContainer('a'))`
  background-image: url(${LinkInternal});
`;
const ExternalAnchorLink = styled(BaseContainer('a'))`
  background-image: url(${LinkExternal});
`;

interface AnchorLinkProps {
  href: string;
  internal?: boolean;
  children: React.ReactNode;
  onClick?: any;
  role?: string;
  tabIndex?: number;
}
/**
 * Link component with arrow to distinguish internal and external links.
 *
 * External links are opened in new tab/window and have noopener / noreferrer
 * attributes.
 */
export const AnchorLink = ({
  href,
  internal,
  children,
  ...props
}: AnchorLinkProps) => {
  const Container = internal ? InternalAnchorLink : ExternalAnchorLink;
  return (
    <Container
      href={href}
      target={internal ? null : '_blank'}
      rel={internal ? null : 'noopener noreferrer'}
      {...props}
    >
      {children}
    </Container>
  );
};

interface RouterLinkProps extends Partial<Link> {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const RouterContainer = styled(BaseContainer(Link))`
  background-image: url(${LinkInternal});
`;

export const RouterLink = ({
  to,
  children,
  className,
  ...props
}: RouterLinkProps) => (
  <RouterContainer to={to} className={className} {...props}>
    {children}
  </RouterContainer>
);
