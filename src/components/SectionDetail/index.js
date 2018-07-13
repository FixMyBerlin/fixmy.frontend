import React, { PureComponent } from 'react';
import styled from 'styled-components';

import detailWrapped from '~/hocs/detailWrapped';
import dummyImageSrc from '~/images/detail-dummy.png';

const ImageWrapper = styled.div`
  position: relative;

  img {
    width: 100%;
  }
`;

class SectionDetails extends PureComponent {
  render() {
    const { name } = this.props;

    return (
      <React.Fragment>
        <ImageWrapper>
          <img src={dummyImageSrc} alt={name} />
        </ImageWrapper>
      </React.Fragment>
    );
  }
}

export default detailWrapped(SectionDetails);
