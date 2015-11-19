import 'app/styles/index.scss';
import React from 'react';
import {render} from 'react-dom';

import { createHistory } from 'history';
import { Router } from 'react-router';

import App from 'app/components';

const element = document.createElement('main');

const history = createHistory();

const rootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    component: App,
    childRoutes: [
      require('app/routes/users'),
      require('app/routes/images')
    ]
  } ]
};


render(<Router history={history} routes={rootRoute} />, element);

document.body.appendChild(element);
