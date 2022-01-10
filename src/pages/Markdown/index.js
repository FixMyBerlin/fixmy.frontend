import ky from 'ky';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import MarkdownContent from '~/pages/Markdown/components/MarkdownContent';

class MarkdownPage extends PureComponent {
  static addNoindexMeta() {
    return (
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
    );
  }

  // Hardcode page names which should include noindex meta tag
  noindexPages = ['imprint', 'privacy'];

  constructor(props) {
    super(props);
    this.state = {
      content: false,
    };
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
    let helmet;
    if (this.noindexPages.includes(this.props.page)) {
      helmet = MarkdownPage.addNoindexMeta();
    }

    return (
      <ContentPageWrapper>
        {helmet}
        <MarkdownContent content={this.state.content} />
      </ContentPageWrapper>
    );
  }
}

export default MarkdownPage;
