import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '~/components/Button';
import config from '~/pages/Reports/config';

const CenteredButton = styled(Button)`
  margin: 0 auto;
  padding: 12px;
  display: block;
  font-size: 1em;
  font-weight: 600;
  font-family: '${config.baseFont}', sans-serif;
  line-height: 1.4;
  text-decoration: none;
  width: 17em;
  text-align: center;
  box-shadow: ${
    config.flatButtons ? 'initial' : '0 0 12px 0 rgba(0, 0, 0, 0.3)'
  };

  &:visited,
  &:hover {
    color: white;
    text-decoration: none;
  }
`;

const JoinButton = ({ toUrl }) => (
  <CenteredButton as="a" href={toUrl}>
    Sagen Sie uns, wo Fahrradbügel benötigt werden
  </CenteredButton>
);

JoinButton.propTypes = {
  toUrl: PropTypes.string
};

JoinButton.defaultProps = {
  toUrl: `${config.routes.reports.new}`
};

export default JoinButton;
