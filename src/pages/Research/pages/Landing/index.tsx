import React from 'react';
import styled from 'styled-components';

import SinglePageWrapper from '~/components2/SinglePageWrapper';

interface HeadlineProps {
  toc?: string;
}

const TestHeadingComp = styled.h1<HeadlineProps>``;

export default function ResearchLanding() {
  return (
    <SinglePageWrapper hasToc>
      <TestHeadingComp toc="Test">Test</TestHeadingComp>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab unde
        obcaecati molestias aliquam pariatur harum non distinctio quae, cum
        doloremque earum voluptatum ipsa omnis vero quasi vel voluptatibus quas
        nam?
      </p>
      <TestHeadingComp toc="Auch ein Test">Auch ein Test</TestHeadingComp>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab unde
        obcaecati molestias aliquam pariatur harum non distinctio quae, cum
        doloremque earum voluptatum ipsa omnis vero quasi vel voluptatibus quas
        nam?
      </p>
    </SinglePageWrapper>
  );
}
