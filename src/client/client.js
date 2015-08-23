import React from 'react';
import {history} from 'react-router/lib/BrowserHistory';
import universalRouter from '../universalRouter';
import routes from './components/Routes';

universalRouter(routes, history).then((component) => {
  React.render(component, document.getElementById('content'));
});
