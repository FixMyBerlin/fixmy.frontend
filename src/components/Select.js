import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Label from '~/components/Label';

const SelectWrapper = styled.div``;

const StyledSelect = styled.select`
  background: transparent;
  height: 34px;
  font-size: 14px;
  text-transform: uppercase;
  color: ${config.colors.darkgrey};
  margin-top: 8px;

  &:focus {
    outline: none;
  }
`;

class Select extends PureComponent {
  static defaultProps = {
    options: [],
    onChange: () => {},
    title: false,
    disabled: false
  }

  render() {
    const { title, options, onChange, disabled } = this.props;
    return (
      <SelectWrapper>
        {title && <Label>{title}</Label>}
        <StyledSelect onChange={onChange} disabled={disabled}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </StyledSelect>
      </SelectWrapper>
    );
  }
}

export default Select;
