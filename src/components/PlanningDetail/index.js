/* eslint react/no-array-index-key: 0, camelcase: 0 */
import React, { PureComponent } from 'react';
import Styled from 'styled-components';

import detailWrapped from '~/hocs/detailWrapped';

import Headline from '~/components/styled/Headline';
import Text from '~/components/styled/Text';

import ImageSlider from './ImageSlider';
import PlanningStatus from './PlanningStatus';

const DetailHead = Styled.div`
  padding: 14px 24px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.24);
  position: relative;
`;

const DetailBody = Styled.div`
  padding: 50px 24px;
  background: ${config.colors.lightbg};
`;

const Subtitle = Styled(Headline)`
  font-family: 'Open Sans', sans-serif;
  font-size: 22px;
  font-weight: 300;
  margin-bottom: 0.4em;
`;

const StatusInfo = Styled.div`
  color: ${config.colors.midgrey};
  font-size: 10px;
  margin-bottom: 2.5em;
`;

const ExpandDescriptionButton = Styled.div`
  color: ${config.colors.interaction};
  cursor: pointer;
  font-size: 14px;
  text-align: center;
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

const Anchor = Styled.a`
  color: ${config.colors.interaction};
  text-decoration: none;

  &:hover {
    color: ${config.colors.interaction};
    text-decoration: underline;
  }

  &:visited, &:active {
    color: ${config.colors.interaction};
  }
`;

class PlanningDetails extends PureComponent {
  state = {
    descriptionExpanded: false
  }

  toggleDescription = () => {
    this.setState({ descriptionExpanded: !this.state.descriptionExpanded });
  }

  render() {
    const { plannings } = this.props.data;
    const planning = plannings[0];
    const {
      title, description, draft, external_url, responsible, costs, faq,
      phase, construction_started, draft_submitted, short_description, cross_section_photo
    } = planning;

    const sliderImages = [
      { src: cross_section_photo },
      { src: cross_section_photo },
      { src: cross_section_photo }
    ];

    return (
      <React.Fragment>
        <ImageSlider images={sliderImages} />

        <DetailHead>
          <Headline>{title}</Headline>
          <Subtitle>
            Fertigstellung: {draft || 'Unbekannt'}
          </Subtitle>
          <StatusInfo>
            {draft_submitted ? `Planungsbeginn: ${draft_submitted}` : null} {construction_started ? `Baubeginn: ${construction_started}` : null}
          </StatusInfo>
          <PlanningStatus phase={phase} />
        </DetailHead>

        <DetailBody>
          <DetailBodySection>
            <Subtitle>Ziel & Hintergrund dieser Maßnahme?</Subtitle>
            <Text>
              {this.state.descriptionExpanded ? description : short_description}
            </Text>
            <ExpandDescriptionButton onClick={this.toggleDescription}>{this.state.descriptionExpanded ? 'Weniger' : 'Mehr >'}</ExpandDescriptionButton>
          </DetailBodySection>

          <DetailBodySection>
            <Subtitle>Projektdaten:</Subtitle>
            <DetailItem>Zuständigkeit: <strong>{responsible}</strong></DetailItem>
            <DetailItem>Projektvolumen: <strong>{costs}</strong></DetailItem>
            <DetailItem>Link zur Planung: <Anchor target="_blank" href={external_url}>{external_url}</Anchor></DetailItem>
            <DetailImage src={cross_section_photo} />
          </DetailBodySection>

          <DetailBodySection>
            <Subtitle>Häufige Fragen:</Subtitle>
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
