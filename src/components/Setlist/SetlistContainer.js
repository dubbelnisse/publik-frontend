import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Setlist from './Setlist'
import * as ConcertActions from '../../actions/concert'

export const SetlistContainer = ({ setlist }) =>
  <Setlist setlist={setlist} />


SetlistContainer.propTypes = {
  setlist: PropTypes.arrayOf(PropTypes.object)
}

function mapStateToProps (state) {
  return {
    setlist: state.concert.setlist
  }
}

function mapDispatch (dispatch) {
  return {
    concertActions: bindActionCreators(ConcertActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatch)(SetlistContainer)
