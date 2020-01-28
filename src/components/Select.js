import React, { PureComponent } from 'react';
import styled from 'styled-components';

import config from '~/config';
import Label from '~/components/Label';

const SelectWrapper = styled.div``;

const StyledSelect = styled.select`
  background: transparent;
  height: 34px;
  font-size: 14px;
  color: ${config.colors.darkgrey};
  margin-top: 8px;
  max-width: 100%;

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.7;
  }
`;

class Select extends PureComponent {
  render() {
    const {
      title,
      options,
      onChange,
      disabled,
      value,
      isVisible,
      className
    } = this.props;

    if (!isVisible) {
      return null;
    }

    return (
      <SelectWrapper className={className}>
        {title && <Label>{title}</Label>}
        <StyledSelect onChange={onChange} disabled={disabled} value={value}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </StyledSelect>
      </SelectWrapper>
    );
  }
}

Select.defaultProps = {
  options: [],
  onChange: () => {},
  title: false,
  disabled: false,
  isVisible: true
};

export default Select;
