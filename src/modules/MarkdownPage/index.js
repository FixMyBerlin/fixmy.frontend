import React, { PureComponent } from 'react';
import Axios from 'axios';

import ContentOverlay from '~/components/ContentOverlay';
import ContentWrapper from '~/components/ContentWrapper';
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

    const { data } = await Axios.get(pageConfig.markdownSource);
    return this.setState({ content: data });
  }

  render() {
    return (
      <ContentOverlay>
        <MenuButton />
        <ContentWrapper>
          <MarkdownContent content={this.state.content} />
        </ContentWrapper>
      </ContentOverlay>
    );
  }
}

export default MarkdownPage;
