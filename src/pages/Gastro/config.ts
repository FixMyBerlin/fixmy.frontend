import globalConfig from '~/config';

const FMB_XHAIN_TERASSEN = `mapbox://styles/hejco/cka5ko81y16yk1iqllts8uieg${
  process.env.NODE_ENV === 'production' ? '' : '?fresh=true'
}`;

const config = {
  ...globalConfig,
  gastro: {
    campaign: 'xhain',
    map: {
      style: FMB_XHAIN_TERASSEN,
      bounds: [
        [13.3651, 52.4658],
        [13.4945, 52.5479]
      ]
    }
  }
};

export default config;
