import React from 'react'
import ReactDOM from 'react-dom'
import {
  applyRouterMiddleware,
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router'

import useScroll from 'react-router-scroll'
import moment from 'moment'

import App from './views/App'
import Start from './views/Start'
import NotFound from './views/NotFound'

moment.locale('sv')

ReactDOM.render((
  <Router
    history={browserHistory}
    render={applyRouterMiddleware(useScroll())}>
    <Route component={App} path="/">
      <IndexRoute
        component={Start} />
    </Route>
    <Route component={NotFound} path="*" />
  </Router>
), document.getElementById('root'))
