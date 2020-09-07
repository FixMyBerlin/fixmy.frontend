import React from 'react';
import styled from 'styled-components';
import PropagateLoader from 'react-spinners/PropagateLoader';
import PropTypes from 'prop-types';
import config from '~/config';

const BaseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperStatic = styled(BaseWrapper)`
  width: 100%;
  height: 100vh;
`;

const WrapperAbsolute = styled(BaseWrapper)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1000;
  /* let through clicks */
  pointer-events: none;
`;

const BigLoader = ({ useAbsolutePositioning }) => {
  const Wrapper = useAbsolutePositioning ? WrapperAbsolute : WrapperStatic;
  return (
    <Wrapper>
      <PropagateLoader color={`${config.colors.interaction}`} />
    </Wrapper>
  );
};

BigLoader.propTypes = {
  useAbsolutePositioning: PropTypes.bool
};

BigLoader.defaultProps = {
  useAbsolutePositioning: false
};

export default BigLoader;
