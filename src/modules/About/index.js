import React, { PureComponent } from 'react';
import Axios from 'axios';
import Markdown from 'react-markdown';
import { If } from 'react-extras';

import MenuButton from '~/components/MenuButton';

import './About.styl';

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
      <div className="about app__content--overlay">
        <MenuButton />
        <div className="about__header">
          <h1>Worum geht es hier?</h1>
        </div>
        <div className="about__content">
          <If condition={typeof this.state.content === 'string'}>
            <Markdown source={this.state.content} />
          </If>
        </div>
      </div>
    );
  }
}

export default About;
