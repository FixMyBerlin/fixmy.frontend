import React, { PureComponent } from 'react';
import ky from 'ky';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import MarkdownContent from '~/pages/Markdown/components/MarkdownContent';

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
    const { page } = this.props;
    const content = await ky.get(`/markdown/${page}.md`).text();
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
