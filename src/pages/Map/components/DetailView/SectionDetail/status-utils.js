export function getSafetyLabel(sideData) {
  if (sideData.safety_index >= 6) {
    return 'sehr sicher';
  }

  if (sideData.safety_index >= 4) {
    return 'ok';
  }

  if (sideData.safety_index >= 2) {
    return 'gefährlich';
  }

  return 'sehr gefährlich';
}

export function getSafetyColor(sideData) {
  if (sideData.safety_index >= 6) {
    return 'hsl(174, 87%, 43%)';
  }

  if (sideData.safety_index >= 4) {
    return '#a0ebe3';
  }

  if (sideData.safety_index >= 2) {
    return 'hsl(14, 83%, 74%)';
  }

  return 'hsl(22, 100%, 52%)';
}

export function getRoadTypeLabel(sideData) {
  if (sideData.road_type >= 3) {
    return 'sehr starker Verkehr';
  }

  if (sideData.road_type >= 2) {
    return 'starker Verkehr';
  }

  if (sideData.road_type >= 1) {
    return 'mittlerer Verkehr';
  }

  return 'ruhiger Verkehr';
}

export function getStreetCategoryLabel(data) {
  if (data.street_category >= 5) {
    return 'Nebenstraße';
  }

  return 'Hauptstraße';
}

export function getInfrastructureLabel(sideData) {
  if (sideData.cycling_infrastructure_safety >= 3) {
    return 'sehr gut';
  }

  if (sideData.cycling_infrastructure_safety >= 2) {
    return 'gut';
  }

  if (sideData.cycling_infrastructure_safety >= 1) {
    return 'schwach';
  }

  return 'keine';
}

export function getInfrastructureDesc(sideData) {
  if (sideData.cycling_infrastructure_ratio >= 1) {
    return '';
  }

  if (sideData.cycling_infrastructure_ratio >= 0.65) {
    return 'Radinfrastruktur überwiegend vorhanden';
  }

  if (sideData.cycling_infrastructure_ratio >= 0.1) {
    return 'Teilweise Radinfrastruktur vorhanden';
  }

  return 'Keine oder ungenügende Radinfrastruktur vorhanden';
}

export default {
  getSafetyLabel,
  getSafetyColor,
  getRoadTypeLabel,
  getStreetCategoryLabel,
  getInfrastructureLabel,
  getInfrastructureDesc
};
