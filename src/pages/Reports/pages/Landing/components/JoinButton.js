import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '~/components/Button';

const CenteredButton = styled(Button)`
  margin: 0 auto;
  padding: 12px;
  display: block;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  width: 200px;
  text-align: center;
  box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.3);

  &:visited, &:hover {
    color: white;
    text-decoration: none;
  }
`;

const JoinButton = ({ toUrl }) => (
  <CenteredButton as="a" href={toUrl}>
    Sag uns, wo du Fahrradbügel benötigst
  </CenteredButton>
);

JoinButton.propTypes = {
  toUrl: PropTypes.string
};

JoinButton.defaultProps = {
  toUrl: `${config.routes.reports.new}`
};

export default JoinButton;
