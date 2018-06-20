import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Axios from 'axios';

import HBIConfigurator from '~/components/HBIConfigurator';
import HBISubmitForm from '~/components/HBISubmitForm';
import Modal from '~/components/Modal';
import { trackEvent } from '~/utils';

class MyHBIView extends PureComponent {
  state = {
    isSubmitFormOpen: false
  }

  onSave = () => {
    const sliderValues = config.hbi.reduce((res, item, index) => {
      res[item.type] = this.props.hbi_values[index];
      return res;
    }, {});
    Axios.post(`${config.apiUrl}/api/profiles`, { uuid: this.props.userid, ...sliderValues });
    trackEvent('hbi', 'savebutton');
    this.onToggleModal();
  }

  onToggleModal = () => {
    this.setState({
      isSubmitFormOpen: !this.state.isSubmitFormOpen
    });
  }

  render() {
    return [
      <HBIConfigurator key="hbi__configurator" onSave={this.onSave} />,
      <Modal key="hbi__modal" isOpen={this.state.isSubmitFormOpen} onClose={this.onToggleModal}>
        <HBISubmitForm userid={this.props.userid} onClose={this.onToggleModal} />
      </Modal>
    ];
  }
}

export default connect(state => state.UserState)(MyHBIView);
