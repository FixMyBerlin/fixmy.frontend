import React, { PureComponent } from 'react';
import fetch from 'unfetch';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import MarkdownContent from './MarkdownContent';

class MarkdownPage extends PureComponent {
  state = {
    content: false
  }

  componentDidMount() {
    this.loadContent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.loadContent();
    }
  }

  async loadContent() {
    const pageConfig = config[this.props.page];

    if (!pageConfig) {
      return false;
    }

    const content = await fetch(pageConfig.markdownSource).then(r => r.text());
    return this.setState({ content });
  }

  render() {
    return (
      <ContentPageWrapper>
        <MarkdownContent content={this.state.content} />
      </ContentPageWrapper>
    );
  }
}

export default MarkdownPage;
