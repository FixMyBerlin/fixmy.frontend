import React, { PureComponent } from 'react';
import styled from 'styled-components';

import BigLabel from '~/components/BigLabel';
import MenuButton from '~/components/MenuButton';

const CardWrapper = styled.div`
  background: #fffaed;
  padding: 16px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
`;

const CardHeader = styled.div`
  text-align: center;
  position: relative;
`;

const CardContent = styled.div`
  max-width: 650px;
  margin: 0 auto;
`;


const StyledMenuButton = styled(MenuButton)`
  top: auto;
`;

class Card extends PureComponent {
  render() {
    return (
      <CardWrapper>
        <CardHeader>
          <StyledMenuButton />
          <BigLabel>Analyse</BigLabel>
        </CardHeader>
        <CardContent>
          {this.props.children}
        </CardContent>
      </CardWrapper>
    );
  }
}

export default Card;
