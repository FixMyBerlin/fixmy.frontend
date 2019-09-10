import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class ClusterWrapper extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
    map: PropTypes.object,
    name: PropTypes.string,
    render: PropTypes.func,
    radius: PropTypes.number
  }

  static defaultProps = {
    name: 'cluster',
    radius: 50,
    render: () => null
  }

  state = {
    clusters: []
  }

  constructor() {
    super();

    this.clusterCreated = false;
    this.clusterSource = null;
  }

  componentDidMount() {
    this.createCluster();
  }

  componentDidUpdate() {
    this.createCluster();
  }

  createCluster() {
    if (this.clusterCreated || !this.props.map) {
      return false;
    }

    const { map, name, data } = this.props;

    map.on('data', (e) => {
      if (e.sourceId !== name || !e.isSourceLoaded) return;

      map.on('move', () => this.updateCluster());
      map.on('moveend', () => this.updateCluster());

      this.updateCluster();
    });

    map.addSource(name, {
      type: 'geojson',
      data,
      cluster: true,
      clusterRadius: this.props.radius
    });

    map.addLayer({
      id: `${name}_circle`,
      type: 'circle',
      source: name,
      filter: ['!=', 'cluster', true],
      paint: {
        'circle-opacity': 0
      }
    });

    this.clusterSource = map.getSource(name);
    this.clusterCreated = true;
  }

  updateCluster() {
    const clusters = this.props.map.querySourceFeatures(this.props.name);

    this.setState({ clusters });
  }

  render() {
    return this.props.render({
      clusters: this.state.clusters,
      clusterSource: this.clusterSource
    });
  }
}

export default ClusterWrapper;
