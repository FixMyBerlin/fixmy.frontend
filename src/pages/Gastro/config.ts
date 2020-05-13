import globalConfig from '~/config';

const FMB_OFFENE_STRASSEN = 'mapbox://styles/hejco/cka5ko81y16yk1iqllts8uieg';

const config = {
  ...globalConfig,
  gastro: {
    campaign: 'xhain',
    map: {
      style: FMB_OFFENE_STRASSEN,
      bounds: [
        [13.3651, 52.4658],
        [13.4945, 52.5479]
      ]
    }
  }
};

export default config;
