import React, { PureComponent } from 'react';
import idx from 'idx';
import styled from 'styled-components';

import Label from '~/components/Label';
import DraftMarker from '~/images/planning-icons/konzept-marker.png';
import PlanningMarker from '~/images/planning-icons/planung-marker.png';
import ExecutionMarker from '~/images/planning-icons/bau-marker.png';
import ReadyMarker from '~/images/planning-icons/fertig-marker.png';

const icons = {
  draft: DraftMarker,
  planning: PlanningMarker,
  execution: ExecutionMarker,
  ready: ReadyMarker
};

const ItemWrapper = styled.div`
  margin: 8px 0;
  padding: 16px;
  background: ${config.colors.lightbg};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.25);
  }
`;

const ItemHeader = styled.div``;

const ItemImage = styled.img`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 32px;
`;

const ItemTitle = styled.div`
  font-size: 14px;
  color: ${config.colors.darkgrey};
  font-weight: 600;
  margin-bottom: 3px;
`;

const ItemSubTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  color: ${config.colors.darkbg};
  margin-top: 16px;
`;

class PlanningListItem extends PureComponent {
  render() {
    const name = idx(this.props, _ => _.planning_sections[0].name);
    const iconSrc = icons[this.props.phase];

    return (
      <ItemWrapper>
        <ItemImage src={iconSrc} />
        <ItemHeader>
          <ItemTitle>
            {name}
          </ItemTitle>
          <Label>
            Abschnitt 1 | xx km
          </Label>
        </ItemHeader>
        <ItemSubTitle>
          {this.props.title}
        </ItemSubTitle>
      </ItemWrapper>
    );
  }
}

export default PlanningListItem;
