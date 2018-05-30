import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MenuButton from '~/components/MenuButton';
import ResetMapButton from '~/components/ResetMapButton';

const SearchBarWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 15px;
  left: 15px;
  right: 15px;
  margin: auto;
`;

const SearchBarInnerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  border: none;
  width: 100%;
  padding: 15px 50px;
  color: ${config.colors.black};
  font-size: 14px;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
  text-align: center;
`;

const SearchMenuBtn = styled(MenuButton)`
  position: absolute;
  top: 15px;
  left: 12px;
`;

const SearchCloseBtn = styled(ResetMapButton)`
  position: absolute;
  top: 7px;
  left: 10px;
`;

class SearchBar extends PureComponent {
  static propTypes = {
    isClosable: PropTypes.bool
  }

  static defaultProps = {
    isClosable: false
  }

  render() {
    return (
      <SearchBarWrapper>
        <SearchBarInnerWrapper>
          {this.props.isClosable ?
            <SearchCloseBtn /> :
            <SearchMenuBtn />
          }
          <SearchInput type="text" placeholder="Suche einen Ort" />
        </SearchBarInnerWrapper>
      </SearchBarWrapper>
    );
  }
}

export default SearchBar;
