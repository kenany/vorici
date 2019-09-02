import PropTypes from 'prop-types';
import React from 'react';

const PercentValue = ({ value }) => <span>{value + '%'}</span>;

PercentValue.propTypes = {
  value: PropTypes.number
};

export default PercentValue;
