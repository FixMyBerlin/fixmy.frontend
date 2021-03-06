import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { Field, ErrorMessage } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { LocationPicker } from '~/components2/LocationPicker';
import { StaticMap } from '~/components2/StaticMap';

import { setLayerVisibility } from '../../utils';
import FormError from '../FormError';

const InvisiLabel = styled.label`
  display: none;
`;

const SectionBase = ({
  shopName = null,
  signupData = null,
  handleChange,
  district,
  values,
}) => {
  const [initialAddress] = useState(values.address);
  return (
    <section>
      {signupData && (
        <p>
          <strong>Name des Betriebs: {shopName}</strong>
        </p>
      )}

      {signupData == null && (
        <Field
          name="shop_name"
          component={TextField}
          label="Name des Betriebs"
          fullWidth
        />
      )}

      <ErrorMessage
        name="category"
        render={(msg) => <FormError error>{msg}</FormError>}
      />
      <div className="dropdown">
        <FormControl fullWidth>
          <InputLabel htmlFor="category">Art des Betriebs wählen</InputLabel>
          <Field
            component={Select}
            name="category"
            inputProps={{
              id: 'category',
            }}
          >
            <MenuItem value="restaurant">Restaurant</MenuItem>
            <MenuItem value="retail">Einzelhandel mit Auslage</MenuItem>
            <MenuItem value="workshop">Werkstatt</MenuItem>
            <MenuItem value="social">Soziales Projekt</MenuItem>
            <MenuItem value="other">Sonstiger Bedarf</MenuItem>
          </Field>
        </FormControl>
      </div>
      <InvisiLabel htmlFor="first_name">Vorname der Inhaber:in</InvisiLabel>
      <Field
        id="first_name"
        name="first_name"
        component={TextField}
        label="Vorname der Inhaber:in"
        fullWidth
      />
      <InvisiLabel htmlFor="last_name">Nachname der Inhaber:in</InvisiLabel>
      <Field
        id="last_name"
        name="last_name"
        component={TextField}
        label="Nachname der Inhaber:in"
        fullWidth
      />
      <InvisiLabel htmlFor="phone">
        Telefonnummer unter der Sie tagsüber gut erreichbar sind
      </InvisiLabel>
      <Field
        id="phone"
        name="phone"
        component={TextField}
        label="Telefonnummer (tagsüber erreichbar)"
        fullWidth
      />
      {signupData == null && (
        <>
          <h3>Wo befindet sich das Ladenlokal?</h3>
          <p>Es können nur Adressen in {district.title} gemeldet werden.</p>
          <ErrorMessage
            name="address"
            render={(msg) => <FormError error>{msg}</FormError>}
          />
          <InvisiLabel htmlFor="address">
            Addresse des Ladengeschäfts
          </InvisiLabel>
          <LocationPicker
            initialValue={initialAddress}
            mapboxStyle={
              district.apps.gastro.maps.gastroRegistration.mapboxStyle
            }
            bounds={district.bounds}
            onLoad={(map) =>
              setLayerVisibility(
                map,
                district.apps.gastro.layerSets,
                district.apps.gastro.maps.gastroRegistration.layerSets
              )
            }
            onSelect={({ address, location }) => {
              handleChange({ target: { name: 'address', value: address } });
              handleChange({
                target: {
                  name: 'location',
                  value: [location.lng, location.lat],
                },
              });
            }}
          />
        </>
      )}
      {signupData != null && (
        <>
          <Field
            id="address"
            name="address"
            component={TextField}
            label="Addresse des Ladengeschäfts"
            disabled
            fullWidth
          />
          <StaticMap
            location={signupData?.geometry?.coordinates}
            mapboxStyle={district?.apps.gastro.maps.gastroSignup.mapboxStyle}
            bounds={district?.bounds}
          />
        </>
      )}

      <p>
        <strong>
          Wie breit ist die Häuserfront ihres Ladenlokals (falls vorhanden)?
        </strong>
      </p>
      <p>
        Auf Grundlage der Straßenfront-Breite kann das Bezirksamt entscheiden
        welcher Raum im Straßenland genutzt werden kann. Sofern sie kein
        Ladenlokal haben bitte 0 angeben.
      </p>
      <InvisiLabel htmlFor="shopfront_length">
        Angabe in Metern z.B. 4,8
      </InvisiLabel>
      <Field
        id="shopfront_length"
        name="shopfront_length"
        type="text"
        inputMode="numeric"
        pattern="[0-9]+(,[0-9]+)?"
        component={TextField}
        label="Angabe in Metern z.B. 4,8"
        fullWidth
      />
    </section>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district,
});

export default connect(mapStateToProps)(SectionBase);
