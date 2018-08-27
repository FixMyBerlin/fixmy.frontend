import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import Textarea from '~/components/styled/Textarea';

const FormFieldSection = styled.div`
  margin-bottom: 1em;
`;

// returns the formfiled thats specified by the passed "type"
export default ({ id, type, label, options, placeholder = '', values, handleChange, errors = {} }) => {
  let Result = null;

  if (['text', 'number', 'email'].includes(type)) {
    Result = <Field type={type} name={id} placeholder={placeholder} />;
  } else if (type === 'checkbox') {
    Result = <Field type="checkbox" name={id} checked={values[id]} />;
  } else if (type === 'textarea') {
    Result = <Textarea name={id} placeholder={placeholder} onChange={handleChange}>{values[id]}</Textarea>;
  } else if (type === 'select') {
    Result = (
      <Field component="select" name={id}>
        {options.map(o => <option key={`${id}__${o.key}`} value={o.key}>{o.value}</option>)}
      </Field>
    );
  }

  return (
    <FormFieldSection>
      <label htmlFor={id}>{label}</label>
      {Result}
      {errors[id] && <div>{errors[id]}</div>}
    </FormFieldSection>
  );
};
