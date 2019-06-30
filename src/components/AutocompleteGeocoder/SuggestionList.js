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

// TODO: it would be cleaner to use the locationId

const Suggestionlist = ({ suggestions, onSuggestionPick }) => {
  const suggestionItems = suggestions
    .map(s => (
      <Suggestion
        key={s.locationId}
        address={s.label}
        onSuggestionPick={() => onSuggestionPick(
          s.label.replace(`${config.map.geocoderHighlightSeperator}`, '')
        )}
      />
    ));

  return (
    <List>{suggestionItems}</List>
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
