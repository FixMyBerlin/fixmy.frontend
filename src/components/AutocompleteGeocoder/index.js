import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import SuggestionList from './SuggestionList';
import Error from './Error';
import api from './api';

class AutocompleteGeocoder extends PureComponent {
  static propTypes = {
    onSearchStart: PropTypes.func,
    onLocationPick: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  }

  static defaultProps = {
    onSearchStart: () => { }
  }

  state = {
    error: null,
    suggestions: []
  }

  geocodeSearchPhrase = (searchPhrase) => {
    api.fetchSuggestions(searchPhrase)
    .then(({ suggestions }) => this.setState({ suggestions }))
    .catch((error) => {
      this.setState({ error, suggestions: null });
      this.props.onError(error);
    });
  }

  render() {
    return (
      <Fragment>
        <SearchBar
          onSearchEnter={this.geocodeSearchPhrase}
          onSearchStart={this.props.onSearchStart}
        />

        {this.state.error && (
          <Error message={this.state.error.message} />
        )}

        <SuggestionList
          suggestions={this.state.suggestions}
          onSuggestionPick={this.props.onLocationPick}
        />
      </Fragment>
    );
  }
}

export default AutocompleteGeocoder;
