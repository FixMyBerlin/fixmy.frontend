const labels = [
  { label: 'Geschwindgkeit', type: 'speed', value: 5, min: 0, max: 10 },
  { label: 'Sicherheit', type: 'security', value: 5, min: 0, max: 10 }
];

const stops = [
  {
    min: 0,
    max: 2.5,
    color: 'hsl(22, 100%, 52%)',
    label: 'sehr schlecht'
  },
  {
    min: 2.5,
    max: 5,
    color: 'hsl(14, 83%, 74%)',
    label: 'schlecht'
  },
  {
    min: 5,
    max: 7.5,
    color: '#a0ebe3',
    label: 'ok'
  },
  {
    min: 7.5,
    max: 100,
    color: 'hsl(174, 87%, 43%)',
    label: 'super'
  }
];

export default {
  stops,
  labels
};