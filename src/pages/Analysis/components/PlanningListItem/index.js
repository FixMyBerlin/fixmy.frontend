import React, { PureComponent } from 'react';
import idx from 'idx';
import styled from 'styled-components';

import Label from '~/components/Label';

const ItemWrapper = styled.div`
  margin: 8px 0;
  padding: 16px;
  background: ${config.colors.lightbg};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.25);
  }
`;

const ItemTitle = styled.div`
  font-size: 14px;
  color: ${config.colors.darkgrey};
  font-weight: 600;
  margin-bottom: 3px;
`;

class PlanningListItem extends PureComponent {
  render() {
    const name = idx(this.props, _ => _.planning_sections[0].name);
    return (
      <ItemWrapper>
        <ItemTitle>
          {name}
        </ItemTitle>
        <Label>
          Abschnitt 1 | xx km
        </Label>
      </ItemWrapper>
    );
  }
}

export default PlanningListItem;
