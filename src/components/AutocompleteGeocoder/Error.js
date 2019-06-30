import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
 `;

// TODO: style

const Error = ({ message }) => (
  <Wrapper className="error">
    <h2>Oops!</h2>
    <p>Hier hat etwas nicht geklappt:</p>
    <b>
      {message}
    </b>
  </Wrapper>
);

Error.propTypes = {
  message: PropTypes.string.isRequired
};

export default Error;
