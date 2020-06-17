import styled from 'styled-components';
import config from '~/config';

interface QuoteProps {
  sourceText?: string;
}

const Quote = styled.div<QuoteProps>`
  background: white;
  box-shadow: 2px 6px 60px 0 rgba(0, 0, 0, 0.09);
  padding: 1.5em;
  font-size: 1.5em;
  font-style: italic;
  font-weight: 600;
  line-height: 1.35;
  border-radius: 6px;
  position: relative;
  max-width: 620px;
  margin: 1em auto 1.8em auto;

  &:after {
    content: "${(p) => p.sourceText}";
    display: ${(p) => (p.sourceText ? 'block' : 'none')};
    position: absolute;
    background: #cf0a7d;
    font-weight: 700;
    font-size: 0.58em;
    font-style: normal;
    padding: 11px 22px;
    border-radius: 3px;
    color: white;
    bottom: 0;
    top: auto;
    left: 50%;
    transform: translate(-50%, 50%);
  }
`;

export default Quote;
