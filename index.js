'use strict';

import document from 'global/document';
import React from 'react';
import dom from 'react-dom';

import Vorici from './src/Vorici';
import './style.css';

dom.render(<Vorici/>, document.getElementById('root'));
