import React, { PureComponent } from 'react';
import styled from 'styled-components';
import MenuButton from '~/components/MenuButton';
import BigLabel from '~/components/BigLabel';

const AnalysisWrapper = styled.div`
  background: ${config.colors.lightgrey};
  padding: 8px;
`;

const Card = styled.div`
  background: #fffaed;
  padding: 16px;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
`;

const StyledMenuButton = styled(MenuButton)`
  top: auto;
`;

const CardHeader = styled.div`
  text-align: center;
  position: relative;
`;

const CardContent = styled.div`
  max-width: 650px;
  margin: 0 auto;
`;

class Analysis extends PureComponent {
  render() {
    return (
      <AnalysisWrapper>
        <Card>
          <CardHeader>
            <StyledMenuButton />
            <BigLabel>Planungsanalyse</BigLabel>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
      </AnalysisWrapper>
    );
  }
}

export default Analysis;
