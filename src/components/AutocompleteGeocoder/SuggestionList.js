import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Suggestion from './Suggestion';

const List = styled.ul`
  display: block;
  margin: 0;
  z-index: 1000;
  background-color: white;
  padding: 0;
`;

const Suggestionlist = ({ suggestions, onSuggestionPick }) => {
  const suggestionItems = suggestions.map((suggestion) => (
    <Suggestion
      key={suggestion.id}
      address={suggestion.address}
      onSuggestionPick={() => onSuggestionPick(suggestion)}
    />
  ));

  return (
    <List
      data-testid="autocomplete-geocoder-suggestion-list"
    >
      {suggestionItems}
    </List>
  );
};

Suggestionlist.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.object),
  onSuggestionPick: PropTypes.func.isRequired
};

Suggestionlist.defaultProps = {
  suggestions: []
};

export default Suggestionlist;
