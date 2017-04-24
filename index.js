'use strict';
import document from 'global/document';
import React from 'react';
import dom from 'react-dom';

import Vorici from './src/Vorici';

dom.render(<Vorici/>, document.getElementById('content'));
