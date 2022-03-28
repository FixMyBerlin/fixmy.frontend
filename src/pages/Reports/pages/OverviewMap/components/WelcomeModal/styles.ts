import styled from 'styled-components';
import { media } from '~/styles/utils';

// Styles based on https://tailwindui.com/components/application-ui/overlays/modals
export const Wrapper = styled.div`
  overflow-y: auto;
  z-index: 2000;
  inset: 0;
  position: fixed;
`;

export const WrapperCenter = styled.div`
  justify-content: center;
  align-items: flex-end;
  min-height: 100vh;
  text-align: center;
`;

export const Background = styled.div`
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  background-color: rgb(107 114 128 / 0.75);
  inset: 0;
  position: fixed;
`;

export const Modal = styled.section`
  vertical-align: middle;
  background-color: white;
  max-width: 900px;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: visible;
  display: inline-block;
  position: relative;
  margin: 3rem 1rem;

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
`;

export const GridWrapper = styled.div`
  margin-bottom: 2.5rem;
  padding: 0 1rem;
  ${media.s`
    padding: 0 1.75rem;
  `}
  ${media.m`
    display: grid;
    gap: 1.75rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    padding: 0 1.75rem;
    margin-bottom: 1.75rem;
  `}
  ${media.l`
    gap: 3rem;
    padding: 0 3rem;
  `}
`;

export const GridChild = styled.div`
  margin-bottom: 1rem;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #353535;
  h2 {
    font-size: 1rem;
  }
  p {
    margin-top: 0;
  }
  ${media.s`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
    text-align: left;
    h2 {
      margin-top: 0;
    }
    `}
  ${media.m`
    display: block;
    margin-bottom: 0;
    h2 {
      margin-top: 1rem;
    }
  `}
`;

export const Headline = styled.h1`
  padding-bottom: 1rem;
  margin-bottom: 2.25rem;
  font-size: 2rem;
  line-height: 1.25em;
  font-family: 'Roboto Slab';
  border-bottom: 1px solid #fabe28;
`;

export const Img = styled.img`
  max-width: 200px;
  ${media.s`
    max-width: 100%;
  `}
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  padding: 0 1rem;

  ${media.m`
    display: none;
  `}
`;
