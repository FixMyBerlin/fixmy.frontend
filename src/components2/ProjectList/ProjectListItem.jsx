import React, { PureComponent } from 'react';
import { generatePath } from 'react-router-dom';
import slugify from 'slugify';
import styled from 'styled-components';
import config from '~/config';
import { numberFormat, getRVALength } from '~/utils/utils';

import Button from '~/components/Button';
import Label from '~/components2/Label';
import ExecutionMarker from '~/images/planning-icons/bau-marker.png';
import ReadyMarker from '~/images/planning-icons/fertig-marker.png';
import DraftMarker from '~/images/planning-icons/konzept-marker.png';
import PlanningMarker from '~/images/planning-icons/planung-marker.png';

/* eslint-disable-next-line import/no-unresolved */
import HeartIcon from '~/images/heart.svg?component';

const icons = {
  draft: DraftMarker,
  planning: PlanningMarker,
  execution: ExecutionMarker,
  ready: ReadyMarker,
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
`;

const ItemSubTitle = styled.div`
  font-size: 14px;
  font-weight: 700;
  font-family: '${config.titleFont}', serif;
  color: ${config.colors.darkbg};
  margin: 0.5em auto;
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

const ProjectLength = ({ length, side, id }) => {
  const rvaLength = getRVALength({ length, side, id });
  if (rvaLength == null) return null;
  return (
    <>
      | {numberFormat(rvaLength / 1000, 1)} km
      {side === 2 && (
        <> (beidseitige Planung mit je {numberFormat(length / 1000, 1)} km)</>
      )}
    </>
  );
};

class ProjectListItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
  }

  onClick = () => {
    const { id, street_name: name } = this.props;
    const url = generatePath(config.routes.map.projectsDetail, {
      id,
      name: name ? slugify(name).toLowerCase() : '',
    });
    this.props.history.push(url);
  };

  toggleExpanded = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  };

  render() {
    const {
      construction_completed: constructionCompleted,
      photos = [],
      id,
      likes,
      street_name: streetName,
      title,
      borough,
      phase,
    } = this.props;

    const iconSrc = icons[phase];
    const photo = photos.length ? photos[0] : false;

    return (
      <ItemWrapper
        onClick={this.toggleExpanded}
        data-testid="project-list-item"
      >
        <ItemContent>
          <ItemImage src={iconSrc} />
          <ItemHeader>
            <ItemTitle>{streetName}</ItemTitle>
            <Label>
              {borough} <ProjectLength {...this.props} />
            </Label>
          </ItemHeader>
          <ItemSubTitle>{title}</ItemSubTitle>
          <ItemFooter>
            <Likes>
              <HeartIcon />
              <Label>{likes}</Label>
            </Likes>
            <DateWrapper>Fertigstellung: {constructionCompleted}</DateWrapper>
          </ItemFooter>
        </ItemContent>
        {this.state.isExpanded && (
          <Expansion>
            <img src={photo.src} alt={title} />
            <Copyright>{photo.copyright}</Copyright>
            {id && <MapButton onClick={this.onClick}>Zur Karte</MapButton>}
          </Expansion>
        )}
      </ItemWrapper>
    );
  }
}

export default ProjectListItem;
