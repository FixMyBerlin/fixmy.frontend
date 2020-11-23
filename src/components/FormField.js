import React from 'react';
import styled from 'styled-components';
import { Field } from 'formik';
import classnames from 'classnames';

import FormFieldError from '~/components/FormFieldError';

const FormFieldSection = styled.div`
  margin-bottom: 1em;

  &.disabled {
    color: #777;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
`;

// returns the formfiled thats specified by the passed "type"
export default ({
  id,
  type,
  label,
  options,
  placeholder = '',
  values,
  handleChange,
  errors = {},
  className = '',
  disabled = false,
}) => {
  let Result = null;
  const formFieldClasses = classnames('formfield', { disabled }, className);

  if (['text', 'number', 'email', 'password'].includes(type)) {
    Result = (
      <Field
        type={type}
        name={id}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  } else if (type === 'checkbox') {
    Result = (
      <Field
        type="checkbox"
        name={id}
        checked={values[id]}
        disabled={disabled}
      />
    );

    return (
      <FormFieldSection className={formFieldClasses}>
        <CheckboxWrapper>
          {Result}
          <span style={{ marginLeft: 10 }}>{label}</span>
        </CheckboxWrapper>
        {errors[id] && <FormFieldError>{errors[id]}</FormFieldError>}
      </FormFieldSection>
    );
  } else if (type === 'textarea') {
    Result = (
      <textarea
        name={id}
        placeholder={placeholder}
        onChange={handleChange}
        value={values[id]}
      />
    );
  } else if (type === 'select') {
    Result = (
      <Field component="select" name={id}>
        {options.map((o) => (
          <option key={`${id}__${o.key}`} value={o.key}>
            {o.value}
          </option>
        ))}
      </Field>
    );
  }

  return (
    <FormFieldSection className={formFieldClasses}>
      <span>{label}</span>
      {Result}
      {errors[id] && <FormFieldError>{errors[id]}</FormFieldError>}
    </FormFieldSection>
  );
};
