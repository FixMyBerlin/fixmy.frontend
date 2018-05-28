import React, { PureComponent } from 'react';
import styled from 'styled-components';

import MenuButton from '~/components/MenuButton';

const SearchBarWrapper = styled.div`
  position: fixed;
  z-index: 1000;
`;

class SearchBar extends PureComponent {
  render() {
    return (
      <SearchBarWrapper>
        <MenuButton style={{ position: 'relative' }} />
      </SearchBarWrapper>
    );
  }
}

export default SearchBar;
