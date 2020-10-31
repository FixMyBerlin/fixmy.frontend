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
    number: PropTypes.number,
    subject: PropTypes.oneOf(['BIKE_STANDS']),
    fee_acceptable: PropTypes.bool
  }),
  geometry,
  id: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  modified_date: PropTypes.string.isRequired,
 
  status: PropTypes.oneOf([
    'report_new',
    'report_verification',
    'report_accepted',
    'report_rejected',
    'report_inactive',
    'planning',
    'tender',
    'invalid',
    'execution',
    'done',
    // deprecated
    'new',
    'verification',
    'accepted',
    'rejected'
  ]),
  status_reason: PropTypes.string,
  url: PropTypes.string.isRequired
});

export default {
  geometry,
  map,
  report
};
