import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Concert from './Concert'
import * as ConcertActions from '../../actions/concert'

export class ConcertContainer extends Component {
  componentDidMount () {
    console.log(this.props.params)
    this.props.concertActions.getConcert(this.props.params.id)
  }

  render () {
    return (
      <Concert />
    )
  }
}

ConcertContainer.propTypes = {
  concertActions: PropTypes.shape({
    getConcert: PropTypes.func,
  }),
  params: PropTypes.shape({
    id: PropTypes.string
  })
}

function mapDispatch (dispatch) {
  return {
    concertActions: bindActionCreators(ConcertActions, dispatch)
  }
}

export default connect(null, mapDispatch)(ConcertContainer)
