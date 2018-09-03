import React, { PureComponent } from 'react';
import idx from 'idx';
import styled from 'styled-components';

import Label from '~/components/Label';
import HeartIcon from '~/images/heart.svg';
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

const ItemFooter = styled.div`
  display: flex;
`;

const Likes = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5x;

  svg {
    width: 16px;
    margin-right: 4px;
  }

  path {
    fill: ${config.colors.interaction};
  }
`;

const DateWrapper = styled.div`
  margin-left: auto;
  font-size: 14px;
  align-self: center;
  color: ${config.colors.darkgrey};
`;

const Expansion = styled.div``;

class PlanningListItem extends PureComponent {
  state = {
    isExpanded: false
  }

  toggleExpanded = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }));
  }

  render() {
    const { construction_completed: constructionCompleted } = this.props;
    const name = idx(this.props, _ => _.planning_sections[0].name);
    const length = idx(this.props, _ => _.planning_sections[0].details[0].length);
    const iconSrc = icons[this.props.phase];

    return (
      <ItemWrapper onClick={this.toggleExpanded}>
        <ItemImage src={iconSrc} />
        <ItemHeader>
          <ItemTitle>
            {name}
          </ItemTitle>
          <Label>
            Abschnitt 1 {length && `| ${(+length / 1000).toFixed(0)} km`}
          </Label>
        </ItemHeader>
        <ItemSubTitle>
          {this.props.title}
        </ItemSubTitle>
        <ItemFooter>
          <Likes>
            <HeartIcon />
            <Label light>0</Label>
          </Likes>
          <DateWrapper>
            Fertigstellung: {constructionCompleted}
          </DateWrapper>
        </ItemFooter>
        {this.state.isExpanded && (
          <Expansion>
            Yooo
          </Expansion>
        )}
      </ItemWrapper>
    );
  }
}

export default PlanningListItem;
