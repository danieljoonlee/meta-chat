import createBrowserHistory from 'history/lib/createBrowserHistory'
export default typeof self !== 'undefined' ? createBrowserHistory() : null;