import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Button from '~/components/Button';
import Title from '~/components/Title';
import Text from '~/components/Text';
import logger from '~/utils/logger';

type State = {
  hasError: boolean;
  message: string;
};

const ErrorWrapper = styled.div`
  margin: 3em auto;
  max-width: 40em;

  .button {
    margin-right: 10px;
  }
`;

class ErrorBoundary extends React.Component<RouteComponentProps, State> {
  static getDerivedStateFromError(error: Error) {
    const { message } = error;
    return { hasError: true, message };
  }

  static reload() {
    window.location.reload();
  }

  static return() {
    window.location.href = '/';
  }

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { hasError: false, message: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger(errorInfo.componentStack);
  }

  render() {
    const { message, hasError } = this.state;
    if (hasError)
      return (
        <ErrorWrapper>
          <Title>Ups, da ist etwas schiefgegangen</Title>
          {message && (
            <Text>
              <em>{message}</em>
            </Text>
          )}
          <Text>
            Du kannst versuchen, diese Seite neu zu laden oder zur Startseite
            zurückzukehren.
          </Text>
          <Button className="button" onClick={ErrorBoundary.reload}>
            Neu laden
          </Button>
          <Button className="button" onClick={ErrorBoundary.return}>
            Zur Startseite
          </Button>
        </ErrorWrapper>
      );

    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
