import PropTypes from 'prop-types';

const eventShape = PropTypes.shape({
  uid: PropTypes.string,
  event: PropTypes.string,
  startDate: PropTypes.number,
  location: PropTypes.string,
});

export default eventShape;
