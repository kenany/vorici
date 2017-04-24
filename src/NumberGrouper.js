'use strict';

import grouper from 'number-grouper';
import PropTypes from 'prop-types';
import React from 'react';

const NumberGrouper = ({ data }) => {
  return <span>{grouper(data)}</span>;
};

NumberGrouper.propTypes = {
  data: PropTypes.number
};

module.exports = NumberGrouper;
