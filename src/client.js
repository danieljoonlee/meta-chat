import React from 'react';
import Router, {HistoryLocation} from 'react-router';
import routes from './components/Routes';
import App from './components/App';

Router.run(routes, HistoryLocation, (Root) => {
  React.render(<Root/>, document.getElementById('content'));
});
