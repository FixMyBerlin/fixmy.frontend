import React, { PureComponent } from 'react';
import idx from 'idx';
import styled from 'styled-components';
import slugify from 'slugify';

import { numberFormat } from '~/utils/utils';
import Label from '~/components/Label';
import Button from '~/components/Button';
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
  background: ${config.colors.lightbg};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  position: relative;

  &:hover {
    box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.25);
  }
`;

const ItemContent = styled.div`
  padding: 16px;
`;

const ItemHeader = styled.div``;

const ItemImage = styled.img`
  position: absolute;
  right: 16px;
  top: 16px;
  width: 32px !important;
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
  margin-top: 4px;
`;

const ItemFooter = styled.div`
  display: flex;
`;

const DateWrapper = styled.div`
  margin-left: auto;
  font-size: 14px;
  align-self: center;
  color: ${config.colors.darkgrey};
`;

const Likes = styled.div`
  display: flex;
  margin-top: 5px;
  align-items: center;

  svg {
    width: 12px;
    height: 12px;
    margin-right: 4px;

    path {
      fill: ${config.colors.interaction};
    }
  }
`;

const Expansion = styled.div`
  position: relative;
  img {
    width: 100%;
  }
`;

const Copyright = styled.div`
  color: white;
  bottom: 5px;
  right: 5px;
  font-size: 10px;
  position: absolute;
`;

const MapButton = styled(Button)`
  position: absolute;
  left: 50%;
  margin-left: -100px;
  width: 200px;
  top: 45%;
  box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.25);

  &:hover {
    box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.4);
    opacity: 1;
  }
`;

class PlanningListItem extends PureComponent {
  state = {
    isExpanded: false
  }

  onClick = () => {
    const id = idx(this.props, _ => _.planning_section_ids[0]);
    const name = idx(this.props, _ => _.planning_sections[0].name);
    const slug = name ? slugify(name) : '';
    this.props.history.push(`/planungen/${id}/${slug.toLowerCase()}`);
  }

  toggleExpanded = () => {
    this.setState(prevState => ({
      isExpanded: !prevState.isExpanded
    }));
  }

  render() {
    const { construction_completed: constructionCompleted, photos = [] } = this.props;
    const name = idx(this.props, _ => _.planning_sections[0].name);
    const length = idx(this.props, _ => _.planning_sections[0].details[0].length);
    const iconSrc = icons[this.props.phase];
    const photo = photos.length ? photos[0] : false;
    const id = idx(this.props, _ => _.planning_section_ids[0]);

    const borough = this.props.borough

    return (
      <ItemWrapper onClick={this.toggleExpanded}>
        <ItemContent>
          <ItemImage   src={iconSrc} />
          <ItemHeader>
            <ItemTitle>
              {name}
            </ItemTitle>
            <Label>
              {borough} {length && `| ${numberFormat((+length / 1000), 1)} km`}
            </Label>
          </ItemHeader>
          <ItemSubTitle>
            {this.props.title}
          </ItemSubTitle>
          <ItemFooter>
            <Likes>
              <HeartIcon />
              <Label>{this.props.likes}</Label>
            </Likes>
            <DateWrapper>
              Fertigstellung: {constructionCompleted}
            </DateWrapper>
          </ItemFooter>
        </ItemContent>
        {this.state.isExpanded && (
          <Expansion>
            <img src={photo.src} alt={this.props.title} />
            <Copyright>{photo.copyright}</Copyright>
            {id && <MapButton onClick={this.onClick}>Zur Karte</MapButton>}
          </Expansion>
        )}
      </ItemWrapper>
    );
  }
}

export default PlanningListItem;
