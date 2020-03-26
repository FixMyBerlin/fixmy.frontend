import React from 'react';
import styled from 'styled-components';

import config from '~/pages/Reports/config';
import Paragraph from '~/pages/Reports/pages/SubmitReport/components/Paragraph';
import StreetBgImage from '~/images/reports/bikestand-placement-street.jpg';

const Image = styled.img`
  width: 100%;
  max-width: 486px;
  margin-top: 1em;
`;

const PlacementNotice = () => (
  <>
    <Paragraph>
      Hinweis: Neue Fahrradbügel werden in {config.reports.region} in der Regel
      auf der Straße installiert, damit der Platz für Fußgänger:innen auf dem
      Gehweg nicht eingeschränkt wird.
    </Paragraph>

    <Image src={StreetBgImage} alt="Straßenseitige Fahrradständer" />
  </>
);

export default PlacementNotice;
