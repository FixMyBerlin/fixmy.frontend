import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import ky from 'ky';

import config from '~/pages/Map/config';
import HBIConfigurator from '~/pages/MyHBI/components/HBIConfigurator';
import HBISubmitForm from '~/pages/MyHBI/components/HBISubmitForm';
import Modal from '~/components/Modal';
import { trackEvent } from '~/utils/utils';

class MyHBIView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSubmitFormOpen: false
    };
  }

  onSave = () => {
    const sliderValues = config.hbi.reduce((res, item, index) => {
      res[item.type] = this.props.hbi_values[index];
      return res;
    }, {});

    const json = { ...sliderValues, id: this.props.userid };
    ky.put(`${config.apiUrl}/profiles/${this.props.userid}`, { json });

    trackEvent('my-hbi', 'save-profile', 'values');
    this.onToggleModal();
  };

  onToggleModal = () => {
    this.setState((prevState) => ({
      isSubmitFormOpen: !prevState.isSubmitFormOpen
    }));
  };

  render() {
    return [
      <HBIConfigurator key="hbi__configurator" onSave={this.onSave} />,
      <Modal
        key="hbi__modal"
        isOpen={this.state.isSubmitFormOpen}
        onClose={this.onToggleModal}
      >
        <HBISubmitForm
          userid={this.props.userid}
          onClose={this.onToggleModal}
        />
      </Modal>
    ];
  }
}

export default connect((state) => state.UserState)(MyHBIView);
