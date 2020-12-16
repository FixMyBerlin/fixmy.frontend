export { default as ArticleHeader } from './ArticleHeader';
export { default as ArticleWrapper } from './ArticleWrapper';

export { Image, ImageMulti, ImageFull } from './Image';

export { default as Map } from './Map';

export { default as Heading } from './Typography/Heading';
export { default as Intro } from './Typography/Intro';
export { default as List } from './Typography/List';
export { Paragraph, Paragraph2Cols } from './Typography/Paragraph';
export { default as Quote } from './Typography/Quote';

export interface SectionProps {
  toc: string;
  tocAnchor?: string;
}
