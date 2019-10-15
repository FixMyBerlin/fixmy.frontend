function setupClusters(name, map, data, radius, handleUpdate) {
  map.on('data', (e) => {
    if (e.sourceId !== name || !e.isSourceLoaded) return;

    map.on('move', () => handleUpdate());
    map.on('moveend', () => handleUpdate());

    handleUpdate();
  });

  map.addSource(name, {
    type: 'geojson',
    data,
    cluster: true,
    clusterRadius: radius
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
}

export { setupClusters };
