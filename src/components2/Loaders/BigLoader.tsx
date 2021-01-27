import React from 'react';
import styled from 'styled-components';
import PropagateLoader from 'react-spinners/PropagateLoader';
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

interface Props {
  useAbsolutePositioning?: boolean;
  className?: string;
}

/**
 * Render a loading animation
 *
 * Color is set by `config.colors.interaction`
 *
 * @param arg0.useAbsolutePositioning: Switch static vs. absolute css position
 * @param arg0.className: styled-components compatibility
 */
const BigLoader = ({ useAbsolutePositioning = false, className }: Props) => {
  const Wrapper = useAbsolutePositioning ? WrapperAbsolute : WrapperStatic;
  return (
    <Wrapper
      className={className}
      role="progressbar"
      aria-busy
      aria-valuetext="loading"
      aria-live="assertive"
    >
      <div aria-hidden>Wird geladen...</div>
      <PropagateLoader color={`${config.colors.interaction}`} />
    </Wrapper>
  );
};

export default BigLoader;
