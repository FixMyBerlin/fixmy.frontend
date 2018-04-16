import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as MenuActions from '~/modules/Menu/MenuState';

import Menu from '~/modules/Menu';
import Home from '~/modules/Home';
import About from '~/modules/About';
import Map from '~/modules/Map';

import './App.styl';

class App extends PureComponent {
  toggleMenu = () => {
    this.props.dispatch(MenuActions.toggle());
  }

  render() {
    const AppClasses = classnames('app', { 'app--menu-open': this.props.Menu.isOpen });

    return (
      <Router>
        <div className={AppClasses}>
          <button onClick={this.toggleMenu}>MENU</button>
          <Menu />
          <div className="app__content">
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/map" component={Map} />
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(
  state => ({
    Menu: {
      isOpen: state.MenuState.isOpen
    }
  })
)(App);
