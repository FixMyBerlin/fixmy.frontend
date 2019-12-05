import React, { PureComponent } from 'react';
import styled from 'styled-components';

import SearchIcon from '~/images/reports/search.svg';
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
  color: ${config.colors.darkgrey};
  font-size: 14px;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.24), 0 0 2px 0 rgba(0, 0, 0, 0.12);
  text-align: center;
`;

const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  top: 15px;
  right: 12px;
`;

const closeSize = 20;

const SearchReset = styled.div`
  position: absolute;
  right: 10px;
  top: 12px;
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
      inputValue: ''
    };
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();

    if (!this.state.inputValue) {
      return false;
    }

    return this.props.onSubmit(this.state.inputValue);
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
          <Form onSubmit={this.onFormSubmit}>
            <SearchInput
              value={this.state.inputValue}
              type="text"
              placeholder="Gib hier eine Adresse ein"
              onChange={this.onChange}
            />
          </Form>
          {this.state.inputValue ? (
            <SearchReset onClick={this.onInputReset}>×</SearchReset>
          ) : (
            <StyledSearchIcon />
          )}
        </SearchBarInnerWrapper>
      </SearchBarWrapper>
    );
  }
}

export default SearchBar;
