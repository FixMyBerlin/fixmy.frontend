import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { TextField, Select } from 'formik-material-ui';
import { FormControl, InputLabel, MenuItem } from '@material-ui/core';
import { connect } from 'react-redux';
import styled from 'styled-components';

import StaticMap from '~/components2/StaticMap';
import FormError from './FormError';
import LocationPicker from '~/components2/LocationPicker';

const InvisiLabel = styled.label`
  display: none;
`;

const SectionBase = ({
  shopName = null,
  signupData = null,
  handleChange,
  district,
  values
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
              id: 'category'
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
        Telefonnummer (tagsüber erreichbar)
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
            mapboxStyle={district.apps.gastro.signup.mapboxStyle}
            bounds={district.bounds}
            onSelect={({ address, location }) => {
              handleChange({ target: { name: 'address', value: address } });
              handleChange({
                target: {
                  name: 'location',
                  value: [location.lng, location.lat]
                }
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
            mapboxStyle={district?.apps.gastro.registration.mapboxStyle}
            bounds={district?.bounds}
          />
        </>
      )}
    </section>
  );
};

const mapStateToProps = ({ AppState }) => ({
  district: AppState.district
});

export default connect(mapStateToProps)(SectionBase);
