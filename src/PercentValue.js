import PropTypes from 'prop-types';
import React from 'react';

const PercentValue = ({ data }) => {
  return <span>{data + '%'}</span>;
};

PercentValue.propTypes = {
  data: PropTypes.number
};

export default PercentValue;
