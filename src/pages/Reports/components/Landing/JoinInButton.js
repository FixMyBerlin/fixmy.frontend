import React from 'react';
import styled from 'styled-components';
import Button from '~/components/Button';
import Link from '~/components/Link';
import PropTypes from 'prop-types';

const StyledButton = styled(Button)`
  display: block;
  width: 182px;
  height: 48px;
  padding: 10px 18px;
  margin-left: auto;
  margin-right: auto;
`;

const StyledLink = styled(Link)`
  color: white;
  font-size: 17px;
  font-weight: bold;
  &:visited {
    color: white;
  }
`;

const JoinInButton = ({ toUrl }) => (
  <StyledButton>
    <StyledLink to={toUrl}>
        Jetzt mitmachen
    </StyledLink>
  </StyledButton>
);

JoinInButton.propTypes = {
  toUrl: PropTypes.string
};

JoinInButton.defaultProps = {
  toUrl: '/meldungen/wo'
};

export default JoinInButton;
