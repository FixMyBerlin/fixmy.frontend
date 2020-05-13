import React, { useState, useEffect } from 'react';
import {
  TextField,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOn';
import ErrorIcon from '@material-ui/icons/Error';
import MapboxGL from 'mapbox-gl';
import styled from 'styled-components';

import { fetchSuggestions } from '~/components/AutocompleteGeocoder/apiService';
import config from '~/pages/Gastro/config';
import Map from './Map';
import logger from '~/utils/logger';

/**
 * Check if a street contains a street number
 *
 * Return true if address starts with any number of non-comma characters,
 * then a digit, then a comma
 *
 * @param address to be checked
 */
const containsStreetNumber = (address: string) => address.match(/^[^,]+\d,/);

const AddressHint = styled.p`
  display: flex;
  width: 100%;
  align-items: center;
  background-color: ${config.colors.lightbg};
  padding: 8px 5px;
  margin-top: 0.5em;

  svg {
    margin: 0 0.5em;
    border-radius: 10px;
  }
`;

const LocationPicker = ({ onSelect }) => {
  // Mapbox-GL.js map instance
  const [map, setMap] = useState(null);

  // Text field value
  const [inputValue, setInputValue] = useState<string>('');

  // Timeout instance to delay sending search queries
  const [searchDelay, setSearchDelay] = useState(null);

  // List of address suggestions
  const [suggestions, setSuggestions] = useState(null);

  // Selected suggestion
  const [selected, setSelected] = useState(null);

  // Hint to warn user about possible problems with the selected address
  const [addressHint, setAddressHint] = useState(null);

  // Error message to be displayed as a snack bar
  const [errorMessage, setErrorMessage] = useState(null);

  // Current map marker
  const [marker, setMarker] = useState(null);

  /**
   * React when a user selects a suggestion from the suggestion list
   */
  useEffect(() => {
    if (selected == null) return;

    // Callback from props for outside effects
    onSelect(selected);

    // The text field should update with the selected result's address
    setInputValue(selected.address);
    setSuggestions(null);

    if (!containsStreetNumber(selected.address))
      setAddressHint('Bitte geben Sie auch eine Hausnummer an.');
    else setAddressHint(null);

    // Update the map marker
    if (marker) marker.remove();
    setMarker(
      new MapboxGL.Marker({ color: config.colors.interaction })
        .setLngLat(selected.location)
        .addTo(map)
    );
    map.flyTo({ center: selected.location, zoom: 16 });
  }, [selected, map]);

  /**
   * React when the user types into the search text field
   */
  useEffect(() => {
    if (inputValue === '' || inputValue.length <= 2) return;

    // Don't search again if input changed because user selected a suggestion
    if (inputValue === selected?.address) return;

    // Search queries are delayed after typing
    if (searchDelay) clearTimeout(searchDelay);
    setSearchDelay(
      setTimeout(async () => {
        logger('searching', inputValue);
        try {
          const results = await fetchSuggestions(inputValue);
          logger('found', results);
          setSuggestions(results);
        } catch (e) {
          logger(e);
          setErrorMessage(
            'Es gab einen Fehler beim Laden der Ergebnisse. Sind Sie mit dem Internet verbunden?'
          );
          throw e;
        }
      }, 300)
    );
  }, [inputValue]);

  return (
    <>
      <TextField
        placeholder="Adresse suchen..."
        fullWidth
        value={inputValue}
        onChange={({ target: { value } }) => setInputValue(value)}
      />
      {suggestions && (
        <List aria-label="Adressvorschläge">
          {suggestions.length > 0 && (
            <ListItem>
              <ListItemText>
                <em>Bitte wählen Sie eine Adresse:</em>
              </ListItemText>
            </ListItem>
          )}
          {suggestions != null && suggestions.length === 0 && (
            <em>
              Es wurde keine Adresse in Friedrichshain-Kreuzberg gefunden.
            </em>
          )}
          {suggestions.map(({ coords, address }) => (
            <ListItem
              button
              onClick={() => setSelected({ address, location: coords })}
            >
              <ListItemIcon>
                <LocationIcon />
              </ListItemIcon>
              <ListItemText primary={address} />
            </ListItem>
          ))}
        </List>
      )}
      {addressHint && (
        <AddressHint>
          <ErrorIcon /> {addressHint}
        </AddressHint>
      )}
      <Map onInit={setMap} />
      <Snackbar open={errorMessage}>{errorMessage}</Snackbar>
    </>
  );
};

export default LocationPicker;
