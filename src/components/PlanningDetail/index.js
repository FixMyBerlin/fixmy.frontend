/* eslint react/no-array-index-key: 0 */
import React, { PureComponent } from 'react';
import Styled from 'styled-components';
import { Choose } from 'react-extras';

import detailWrapped from '~/hocs/detailWrapped';

import Headline from '~/components/styled/Headline';
import Text from '~/components/styled/Text';

import ImageSlider from './ImageSlider';
import PlanningStatus from './PlanningStatus';

const DetailHead = Styled.div`
  padding: 14px 24px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.24);
`;

const DetailBody = Styled.div`
  padding: 50px 24px;
  background: ${config.colors.lightbg};
`;

const Subtitle = Styled(Headline)`
  font-family: 'Open Sans', sans-serif;
  font-size: 22px;
  font-weight: 300;
`;

const ExpandDescriptionButton = Styled.button`
  color: ${config.colors.interaction};
`;

const DetailBodySection = Styled.div`
  border-bottom: 1px dashed #c6c6c6;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const DetailItem = Styled(Text)`
  margin-bottom: 20px;
`;

const DetailImage = Styled.img`
  width: 100%;
`;

class PlanningDetails extends PureComponent {
  state = {
    descriptionExpanded: false
  }

  toggleDescription = () => {
    this.setState({ descriptionExpanded: !this.state.descriptionExpanded });
  }

  render() {
    const { data } = this.props;
    const { title, draft, responsible, costs, faq, phase } = data;

    const sliderImages = [
      { src: data.cross_section_photo },
      { src: data.cross_section_photo },
      { src: data.cross_section_photo }
    ];

    return (
      <React.Fragment>
        <ImageSlider images={sliderImages} />

        <DetailHead>
          <Headline>{title}</Headline>
          <Subtitle>Fertigstellung: {draft || 'Unbekannt'}</Subtitle>
          <PlanningStatus phase={phase} />
        </DetailHead>

        <DetailBody>

          <DetailBodySection>
            <Headline>Ziel & Hintergrund dieser Maßnahme?</Headline>
            <Text>
              <Choose>
                <Choose.When condition={this.state.descriptionExpanded}>{data.description}</Choose.When>
                <Choose.Otherwise>{data.short_description}</Choose.Otherwise>
              </Choose>
            </Text>
            <ExpandDescriptionButton onClick={this.toggleDescription}>{this.state.descriptionExpanded ? 'Weniger' : 'Mehr'}</ExpandDescriptionButton>
          </DetailBodySection>

          <DetailBodySection>
            <Headline>Projektdaten:</Headline>
            <DetailItem>Zuständigkeit: <strong>{responsible}</strong></DetailItem>
            <DetailItem>Projektvolumen: <strong>{costs}</strong></DetailItem>
            <DetailItem>Link zur Planung: <a target="_blank" href={data.external_url}>{data.external_url}</a></DetailItem>
            <DetailImage src={data.cross_section_photo} />
          </DetailBodySection>

          <DetailBodySection>
            <Headline>Häufige Fragen:</Headline>
            {faq.map((f, i) => (
              <div key={`FAQ_Item_${i}`}>
                <Text><strong>{f.text}</strong></Text>
                <Text>{f.answer}</Text>
              </div>
            ))}
          </DetailBodySection>

        </DetailBody>
      </React.Fragment>
    );
  }
}

export default detailWrapped(PlanningDetails);
