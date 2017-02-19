'use strict';

import grouper from 'number-grouper';
import PropTypes from 'prop-types';
import React from 'react';

const NumberGrouper = ({ value }) => {
  return <span>{grouper(value)}</span>;
};

NumberGrouper.propTypes = {
  value: PropTypes.number
};

export default NumberGrouper;
