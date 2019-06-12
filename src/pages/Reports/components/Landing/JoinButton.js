import React from 'react';
import styled from 'styled-components';
import Button from '~/components/Button';
import PropTypes from 'prop-types';

const CenteredButton = styled(Button)`
  margin: 0 auto;
  display: block;
  font-size: 17px;
  font-weight: 700;
  text-decoration: none;
  width: 200px;
  text-align: center;

  &:visited, &:hover {
    color: white;
    text-decoration: none;
  }
`;

const JoinButton = ({ toUrl }) => (
  <CenteredButton as="a" href={toUrl}>
    Jetzt mitmachen
  </CenteredButton>
);

JoinButton.propTypes = {
  toUrl: PropTypes.string
};

JoinButton.defaultProps = {
  toUrl: `${config.routes.reports.map}`
};

export default JoinButton;
