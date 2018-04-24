import React, { PureComponent } from 'react';
import Axios from 'axios';

import ContentOverlay from '~/components/ContentOverlay';
import MenuButton from '~/components/MenuButton';
import AboutHeader from './AboutHeader';
import AboutContent from './AboutContent';

class About extends PureComponent {
  state = {
    content: false
  }

  componentDidMount() {
    this.loadContent();
  }

  async loadContent() {
    const { data } = await Axios.get(config.about.markdownSource);
    this.setState({ content: data });
  }

  render() {
    return (
      <ContentOverlay>
        <MenuButton />
        <AboutHeader />
        <AboutContent content={this.state.content} />
      </ContentOverlay>
    );
  }
}

export default About;
