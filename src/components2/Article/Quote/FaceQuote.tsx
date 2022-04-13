import React from 'react';
import styled from 'styled-components';
import config from '~/pages/Reports/config';

const QuoteSection = styled.div`
  line-height: 1.37;
  color: ${config.colors.darkgrey};
  max-width: 320px;
  padding: 8px;
  margin: 0 auto;
`;

const ImgWrapper = styled.div`
  width: 144px;
  display: block;
  margin: 0 auto;
`;

const ImgAttribution = styled.div`
  color: ${config.colors.darkgrey};
  font-size: 12px;
  margin: 0.5em;
  text-align: center;
`;

const BlockQuote = styled.blockquote`
  text-align: center;
  font-style: italic;
  margin: 20px 0 28px 0;
`;

const SourcePerson = styled.p`
  font-size: 1em;
  font-weight: bold;
  color: ${config.colors.darkbg};
  text-align: center;
  margin-bottom: 0;
`;

const SourceFunction = styled.p`
  margin-top: 0;
  font-size: 12px;
  text-align: center;
  color: ${config.colors.darkgrey};
`;

type Props = {
  sourceName?: string;
  sourceFunction?: string;
} & (
  | { imageAttributionText?: string; image?: React.ReactElement }
  | { imageAttributionText: string; image: React.ReactElement }
);

export const FaceQuote: React.FC<Props> = ({
  image,
  imageAttributionText,
  sourceName,
  sourceFunction,
  children,
}) => (
  <QuoteSection>
    {!!image && <ImgWrapper>{image}</ImgWrapper>}
    {!!imageAttributionText && (
      <ImgAttribution>{imageAttributionText}</ImgAttribution>
    )}
    <BlockQuote>„{children}“</BlockQuote>
    {!!sourceName && <SourcePerson>{sourceName}</SourcePerson>}
    {!!sourceFunction && <SourceFunction>{sourceFunction}</SourceFunction>}
  </QuoteSection>
);
