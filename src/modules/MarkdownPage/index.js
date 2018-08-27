import React, { PureComponent } from 'react';
import fetch from 'unfetch';

import ContentWrapper from '~/components/styled/ContentWrapper';
import MenuButton from '~/components/MenuButton';
import MarkdownContent from './MarkdownContent';

class MarkdownPage extends PureComponent {
  state = {
    content: false
  }

  componentDidMount() {
    this.loadContent();
  }

  async loadContent() {
    const pageConfig = config[this.props.page];

    if (!pageConfig) {
      return false;
    }

    const content = await fetch(pageConfig.markdownSource);
    return this.setState({ content });
  }

  render() {
    return (
      <ContentWrapper>
        <MenuButton />
        <MarkdownContent content={this.state.content} />
      </ContentWrapper>
    );
  }
}

export default MarkdownPage;
