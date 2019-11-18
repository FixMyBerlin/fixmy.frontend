import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @font-face {
    font-family: FranklinGothic-Book;
    font-style: normal;
    font-weight: 400;
    src: url(https://background.tagesspiegel.de/build/fonts/FranklinGothic-Book.19138bf7.woff2) format('woff2');
  }

  @font-face {
    font-family: FranklinGothic-Demi;
    font-style: normal;
    font-weight: 400;
    src: url(https://background.tagesspiegel.de/build/fonts/FranklinGothic-Demi.debd9572.woff2) format('woff2');
  }
`;
