import PropTypes from 'prop-types';

/**
 * PropType for a geometry definition as returned from the backend
 */
const geometry = PropTypes.shape({
  type: PropTypes.oneOf(['Point', 'Linestring']),
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
});

/**
 * PropType for a Mapbox WebGL map
 * 
 * This is an object with properties as defined on
 * https://docs.mapbox.com/mapbox-gl-js/api/
 */
const map = PropTypes.object;

/**
 * PropType for a single report as returned from the backend
 */
const report = PropTypes.shape({
  address: PropTypes.string,
  created_date: PropTypes.string,
  description: PropTypes.string,
  details: PropTypes.shape({
    number: PropTypes.number.isRequired,
    subject: PropTypes.oneOf(['BIKE_STANDS']).isRequired,
    fee_acceptable: PropTypes.bool.isRequired
  }),
  geometry: geometry.isRequired,
  id: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  liked_by_user: PropTypes.bool.isRequired,
  modified_date: PropTypes.string.isRequired,
  photo: PropTypes.shape({
    copyright: PropTypes.string,
    src: PropTypes.string
  }),
  status: PropTypes.oneOf([
    'new',
    'verification',
    'accepted',
    'rejected',
    'done'
  ]),
  status_reason: PropTypes.string,
  url: PropTypes.string.isRequired
  // TODO: add user field
});

export default {
  geometry,
  map,
  report
};
