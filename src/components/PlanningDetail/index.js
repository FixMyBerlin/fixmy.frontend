/* eslint react/no-array-index-key: 0, camelcase: 0 */
import React, { PureComponent } from 'react';
import Styled from 'styled-components';

import detailWrapped from '~/hocs/detailWrapped';

import Title from '~/components/styled/Title';
import SectionTitle from '~/components/styled/SectionTitle';
import Text from '~/components/styled/Text';
import Label from '~/components/styled/Label';
import DetailSwitch, { ButtonGroup } from '~/components/DetailSwitch';

import ImageSlider from './ImageSlider';
import PlanningStatus from './PlanningStatus';

const DetailHead = Styled.div`
  padding: 14px 24px;
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.24);
  position: relative;
  background: white;
`;

const DetailBody = Styled.div`
  padding: 10px 24px;
  background: ${config.colors.lightbg};
  flex-grow: 1;
`;

const ExpandDescriptionButton = Styled.div`
  color: ${config.colors.interaction};
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  display: none; // for now we dont want to display the more button
`;

const DetailBodySection = Styled.div`
  border-bottom: 1px dashed #c6c6c6;
  padding-bottom: 20px;
  margin-bottom: 20px;
`;

const DetailItem = Styled(Text)`
  margin-bottom: 10px;
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
    descriptionExpanded: false,
    sideIndex: 0
  }

  onSwitchSide = sideIndex => () => this.setState({ sideIndex })
  toggleDescription = () => {
    this.setState({ descriptionExpanded: !this.state.descriptionExpanded });
  }

  render() {
    const { plannings } = this.props.data;
    const { sideIndex } = this.state;
    const planning = plannings[sideIndex];
    const {
      title, description, draft, external_url, responsible, costs, faq, photos,
      phase, construction_started, draft_submitted, short_description, cross_section_photo
    } = planning;

    const showFaq = faq && faq.length;
    const showSwitchButton = plannings.length > 1 && (plannings[0].url !== plannings[1].url);

    return (
      <React.Fragment>
        {showSwitchButton ? (
          <ButtonGroup>
            <DetailSwitch
              activeSideIndex={sideIndex}
              sideIndex={0}
              title="Westseite"
              side="left"
              onClick={this.onSwitchSide}
            />
            <DetailSwitch
              activeSideIndex={sideIndex}
              sideIndex={1}
              title="Ostseite"
              side="right"
              onClick={this.onSwitchSide}
            />
          </ButtonGroup>) : null
        }
        <ImageSlider images={photos} />

        <DetailHead>
          <Title>{title}</Title>
          <SectionTitle>
            Fertigstellung: {draft || 'Unbekannt'}
          </SectionTitle>
          <Label margin="-12px 0 25px 0">
            {draft_submitted ? `Planungsbeginn: ${draft_submitted}` : null} {construction_started ? `Baubeginn: ${construction_started}` : null}
          </Label>
          <PlanningStatus phase={phase} />
        </DetailHead>

        <DetailBody>
          <DetailBodySection>
            <SectionTitle>Ziel & Hintergrund dieser Maßnahme?</SectionTitle>
            <Text>
              {this.state.descriptionExpanded ? description : short_description}
            </Text>
            <ExpandDescriptionButton onClick={this.toggleDescription}>{this.state.descriptionExpanded ? 'Weniger' : 'Mehr >'}</ExpandDescriptionButton>
          </DetailBodySection>

          <DetailBodySection>
            <SectionTitle>Projektdaten:</SectionTitle>
            <DetailItem>Zuständigkeit: <strong>{responsible}</strong></DetailItem>
            <DetailItem>Projektvolumen: <strong>{costs || 'keine Angaben'}</strong></DetailItem>
            {external_url ? <DetailItem>Link zur Planung: <Anchor target="_blank" href={external_url}>{external_url}</Anchor></DetailItem> : null}
            {cross_section_photo ? <DetailImage src={cross_section_photo} /> : null}
          </DetailBodySection>

          {showFaq ? (
            <DetailBodySection>
              <SectionTitle>Häufige Fragen:</SectionTitle>
              {faq.map((f, i) => (
                <div key={`FAQ_Item_${i}`}>
                  <Text><strong>{f.text}</strong></Text>
                  <Text>{f.answer}</Text>
                </div>
              ))}
            </DetailBodySection>
          ) : null}

        </DetailBody>
      </React.Fragment>
    );
  }
}

export default detailWrapped(PlanningDetails);
