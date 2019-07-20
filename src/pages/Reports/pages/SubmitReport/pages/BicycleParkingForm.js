import React, { useState  } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BicycleParkingForm = ({}) => {
  
  const [ wouldPay, setWouldPay ] = useState(null);
  const [ dailyRent, setDailyRend ] = useState(1);

  return (
    
  )
}

BicycleParkingForm.propTypes = {
  onConfirm: PropTypes.func.isRequired
}

export default BicycleParkingForm;
