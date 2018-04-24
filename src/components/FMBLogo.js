import React from 'react';
import PropTypes from 'prop-types';
import FixMyLogo from '~/images/logofmb@2x.png';

const FMBLogo = props => (
  <div className={props.className}>
    <img width={props.width} src={FixMyLogo} alt="logo" />
  </div>
);

FMBLogo.propTypes = {
  width: PropTypes.number
};

FMBLogo.defaultProps = {
  width: 70
};

export default FMBLogo;
