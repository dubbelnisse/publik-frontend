import { combineReducers } from 'redux'
import concert from './concert'

const appReducer = combineReducers({
  concert
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
