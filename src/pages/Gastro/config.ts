import globalConfig from '~/config';

const config = {
  ...globalConfig,
  gastro: {
    campaign: 'xhain',
    map: {
      style: 'mapbox://styles/hejco/cjpnt0cc41ipy2rlpu19jgt7a',
      bounds: [
        [13.3651, 52.4658],
        [13.4945, 52.5479]
      ]
    }
  }
};

export default config;
