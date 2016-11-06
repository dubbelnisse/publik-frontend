import {
  CONCERT_FETCH,
  CONCERT_UPDATE,
  CONCERT_ERROR
} from '../actions/concert'

import { handleActions } from 'redux-actions'

const initialState = {
  isFetching: false,
  setlist: []
}

export default handleActions({
  [CONCERT_FETCH]: (state) => ({
    ...state,
    isFetching: true
  }),
  [CONCERT_UPDATE]: (state, { payload }) => ({
    ...state,
    ...payload,
    isFetching: false
  }),
  [CONCERT_ERROR]: (state, { payload }) => ({
    ...state,
    error: payload
  })
}, initialState)
