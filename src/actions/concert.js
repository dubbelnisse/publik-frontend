import { get } from '../core/httpClient'
import { createAction } from 'redux-actions'

export const CONCERT_FETCH = 'CONCERT_FETCH'
export const CONCERT_UPDATE = 'CONCERT_UPDATE'
export const CONCERT_ERROR = 'CONCERT_ERROR'

/* ACTIONS
------------------------------------------------- */
export const concertFetch = createAction(CONCERT_FETCH)
export const concertUpdate = createAction(CONCERT_UPDATE)
export const concertError = createAction(CONCERT_ERROR)

/* THUNKS
------------------------------------------------- */
/**
 * Get priceplans for current user.
 * Dispatches CONCERT_UPDATE if successful
 * Dispatches CONCERT_ERROR if unsuccessful
 */
export function getConcert (id) {
  return (dispatch) => {
    dispatch(concertFetch())

    get(`/concert/${id}`)
      .then(result => dispatch(concertUpdate(result.data)))
      .catch(error => dispatch(concertError(error)))
  }
}
