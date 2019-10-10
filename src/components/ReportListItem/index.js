import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Label from '~/components/Label';
import Button from '~/components/Button';
import HeartIcon from '~/images/heart.svg';
import BikestandsIcon from '~/images/reports/bikestands-icon.svg';
import DefaultPhotoSrc from '~/images/reports/landing-christin-hume-595752-unsplash.jpg';

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

const ItemImage = styled(BikestandsIcon)`
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
  margin-top: 16px;
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
  };

  onClick = () => {
    const { id } = this.props;
    this.props.history.push(`${config.routes.reports.map}/${id}`);
  };

  toggleExpanded = () => {
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded
    }));
  };

  render() {
    const { id, photo, likes, details, address } = this.props;
    const count = details.number;
    const subtitle = `${count} ${
      count === 1 ? 'neuer' : 'neue'
    } Fahrradbügel gewünscht`;

    const photoSrc = photo ? photo.src : DefaultPhotoSrc;
    const photoCopyright = photo ? photo.copyright : '';

    return (
      <ItemWrapper onClick={this.toggleExpanded}>
        <ItemContent>
          <ItemImage />
          <ItemHeader>
            <ItemTitle>{address}</ItemTitle>
            <Label>Meldung {id}</Label>
          </ItemHeader>
          <ItemSubTitle>{subtitle}</ItemSubTitle>
          <ItemFooter>
            <Likes>
              <HeartIcon />
              <Label>{likes}</Label>
            </Likes>
            <DateWrapper>Status: Neue Meldung</DateWrapper>
          </ItemFooter>
        </ItemContent>
        {this.state.isExpanded && (
          <Expansion>
            <img src={photoSrc} alt={subtitle} />
            <Copyright>{photoCopyright}</Copyright>
            {id && <MapButton onClick={this.onClick}>Zur Karte</MapButton>}
          </Expansion>
        )}
      </ItemWrapper>
    );
  }
}

export default PlanningListItem;
