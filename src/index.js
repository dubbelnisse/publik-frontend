import React from 'react'
import ReactDOM from 'react-dom'
import {
  applyRouterMiddleware,
  browserHistory,
  IndexRoute,
  Route,
  Router
} from 'react-router'

import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
const store = configureStore()

import useScroll from 'react-router-scroll'
import moment from 'moment'

import App from './views/App'
import Start from './views/Start'
import NotFound from './views/NotFound'
import Concert from './views/Concert'

moment.locale('sv')

ReactDOM.render((
  <Provider store={store}>
    <Router
      history={browserHistory}
      render={applyRouterMiddleware(useScroll())}>
      <Route component={App} path="/">
        <IndexRoute
          component={Start} />
        <Route
          component={Concert}
          path="/concert/:id" />
      </Route>
      <Route component={NotFound} path="*" />
    </Router>
  </Provider>
), document.getElementById('root'))
