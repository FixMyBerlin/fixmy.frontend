const bikeCategories = [
  { key: '-', value: 'Bitte auswählen' },
  { key: 'racing_cycle', value: 'Rennrad' },
  { key: 'city_bike', value: 'Stadtfahrrad' },
  { key: 'mountain_bike', value: 'Mountainbike' },
  { key: 'e_bike', value: 'E-Bike' },
  { key: 'cargo_bike', value: 'Cargo Bike' },
  { key: 'e_cargo_bike', value: 'E-Cargo Bike' }
];

const gender = [
  { key: '-', value: 'Bitte auswählen' },
  { key: 'f', value: 'Frau' },
  { key: 'm', value: 'Mann' },
  { key: 'o', value: 'Andere' }
];

const usages = [
  { key: '-', value: 'Bitte auswählen' },
  { key: 0, value: 'nie' },
  { key: 1, value: 'einmal im Monat' },
  { key: 2, value: 'einmal in der Woche' },
  { key: 3, value: 'einmal am Tag' }
];

const config = [
  {
    id: 'age',
    value: '',
    type: 'number',
    label: 'Alter',
    placeholder: 'Alter angeben...'
  },
  {
    id: 'sex',
    value: '',
    type: 'select',
    label: 'Geschlecht',
    options: gender
  },
  {
    id: 'postal_code',
    value: '',
    type: 'text',
    label: 'Postleitzahl',
    placeholder: 'Postleitzahl angeben...'
  },
  {
    id: 'category_of_bike',
    value: '',
    type: 'select',
    label: 'Fahrradtyp',
    options: bikeCategories
  },
  { id: 'usage', value: '', type: 'select', label: 'Nutzung', options: usages },
  {
    id: 'has_trailer',
    value: false,
    type: 'checkbox',
    label: 'Anhänger vorhanden'
  }
];

export const initialValues = config.reduce((res, item) => {
  res[item.id] = item.value;
  return res;
}, {});

export default config;
