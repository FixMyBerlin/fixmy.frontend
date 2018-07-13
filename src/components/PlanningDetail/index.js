import React, { PureComponent } from 'react';

import detailWrapped from '~/hocs/detailWrapped';

import ImageSlider from './ImageSlider';

class PlanningDetails extends PureComponent {
  render() {
    console.log(this.props.data);
    const { data } = this.props;
    const sliderImages = [
      { src: data.cross_section_photo },
      { src: data.cross_section_photo },
      { src: data.cross_section_photo }
    ];

    return (
      <React.Fragment>
        <ImageSlider images={sliderImages} />
      </React.Fragment>
    );
  }
}

export default detailWrapped(PlanningDetails);
