const config = [
  {
    id: 'name', value: '', type: 'text', label: 'Name', placeholder: 'Name angeben...', validateError: 'Bitte geben Sie einen Namen an.'
  },
  {
    id: 'email', value: '', type: 'email', label: 'E-Mail', placeholder: 'E-Mail angeben...', validateError: 'Bitte geben Sie eine E-Mail Adresse an.'
  },
  {
    id: 'feedback', value: '', type: 'textarea', label: 'Text', placeholder: 'Feedback angeben...', validateError: 'Bitte geben Sie Feedback an.'
  }
];

export const initialValues = config.reduce((res, item) => {
  res[item.id] = item.value;
  return res;
}, {});

export default config;
