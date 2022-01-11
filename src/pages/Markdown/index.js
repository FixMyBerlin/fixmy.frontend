import ky from 'ky';
import React, { PureComponent } from 'react';
import { Helmet } from 'react-helmet';

import ContentPageWrapper from '~/components/ContentPageWrapper';
import MarkdownContent from '~/pages/Markdown/components/MarkdownContent';

class MarkdownPage extends PureComponent {
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
    return (
      <ContentPageWrapper>
        {this.noindexPages.includes(this.props.page) && (
          <Helmet>
            <meta name="robots" content="noindex" />
          </Helmet>
        )}
        <MarkdownContent content={this.state.content} />
      </ContentPageWrapper>
    );
  }
}

export default MarkdownPage;
