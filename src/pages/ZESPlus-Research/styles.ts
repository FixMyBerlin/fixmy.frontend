import styled from 'styled-components';
import { ArticleWrapper } from '~/components2/Article';

export const Wrapper = styled(ArticleWrapper)`
  background: none;
  h2 {
    text-transform: none;
  }

  .contentWrapper {
    box-shadow: none;
  }

  .fmc-article-tocentry {
    margin-bottom: 0.75em;
    font-family: 'Roboto Slab';
    font-weight: 100;
  }

  .fmc-article-tocentry-active {
    font-weight: 700;
  }
`;

export const Logo = styled.img`
  width: 105px;
  height: 42px;
`;
