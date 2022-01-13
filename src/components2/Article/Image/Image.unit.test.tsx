import { render } from '@testing-library/react';
import React from 'react';

import { Image, ImageFull, ImageMulti } from '~/components2/Article/Image';
import Logo from '~/images/logofmb.png';
import Logo2 from '~/images/partner/bmdv-gefoerdert.png';

describe('Article.Image', () => {
  it('renders', async () => {
    const { getByRole } = render(<Image source={Logo} alt="Our logo" />);
    expect(getByRole('img', { name: 'Our logo' })).toBeInTheDocument();
  });
});

describe('Article.ImageFull', () => {
  it('renders', async () => {
    const { getByRole } = render(<ImageFull source={Logo} alt="Our logo" />);
    expect(getByRole('img', { name: 'Our logo' })).toBeInTheDocument();
  });
});

describe('Article.ImageMulti', () => {
  it('renders', async () => {
    const { findAllByText, getByRole } = render(
      <ImageMulti>
        <ImageMulti.Inner source={Logo} alt="Our logo">
          <ImageMulti.Subtitle>Subtitle1</ImageMulti.Subtitle>
        </ImageMulti.Inner>
        <ImageMulti.Inner source={Logo2} alt="Their logo">
          <ImageMulti.Subtitle>Subtitle2</ImageMulti.Subtitle>
        </ImageMulti.Inner>
      </ImageMulti>
    );
    expect(getByRole('img', { name: 'Our logo' })).toBeInTheDocument();
    expect(getByRole('img', { name: 'Their logo' })).toBeInTheDocument();
    const subtitles = await findAllByText(/Subtitle{1,2}/);
    expect(subtitles).toHaveLength(2);
  });
});
