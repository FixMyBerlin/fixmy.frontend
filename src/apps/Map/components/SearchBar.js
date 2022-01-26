import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { geocodeAddress } from '~/apps/Map/MapState';
import MenuButton from '~/components/MenuButton';
import config from '~/config';
import SearchIconImage from '~/images/reports/search.svg';
import Store from '~/store';
import { media } from '~/styles/utils';

const Form = styled.form`
  width: 100%;
`;

const SearchBarWrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 15px;
  left: 15px;
  right: 15px;
  margin: auto;

  ${media.m`
    max-width: 400px;
    margin: 0;
  `}
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
  font-size: 16px;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
  text-align: center;
`;

const SearchIcon = styled(SearchIconImage)`
  width: 25px;
  height: 100%;
  position: absolute;
  right: 0;
  margin-right: 10px;
  pointer-events: none;
`;

const SearchMenuBtn = styled(MenuButton)`
  position: absolute;
  top: 15px;
  left: 12px;
`;

const closeSize = 20;

const SearchReset = styled.div`
  position: absolute;
  right: 10px;
  top: 15px;
  border-radius: 50%;
  width: ${closeSize}px;
  height: ${closeSize}px;
  background: #ddd;
  color: #555;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  font-weight: 700;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 1px 1px 2px rgba(0, 0, 0, 0.12);

  &:hover {
    background: #eee;
  }
`;

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  onSubmit = (evt) => {
    evt.preventDefault();

    if (!this.state.inputValue) {
      return false;
    }

    return Store.dispatch(geocodeAddress(this.state.inputValue));
  };

  onChange = (evt) => {
    this.setState({ inputValue: evt.target.value });
  };

  onInputReset = () => {
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <SearchBarWrapper>
        <SearchBarInnerWrapper>
          {!this.props.isEmbedMode && <SearchMenuBtn />}
          <Form onSubmit={this.onSubmit}>
            <SearchInput
              value={this.state.inputValue}
              type="text"
              placeholder="Suche einen Ort"
              onChange={this.onChange}
            />
            {this.state.inputValue && <SearchIcon />}
          </Form>
          {this.state.inputValue ? (
            <SearchReset onClick={this.onInputReset}>×</SearchReset>
          ) : null}
        </SearchBarInnerWrapper>
      </SearchBarWrapper>
    );
  }
}

export default connect((state) => ({
  isEmbedMode: state.MapState.isEmbedMode,
}))(SearchBar);
