import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import YT from '../../utils/youtube'
import Player from './Player'

export class PlayerContainer extends Component {
  componentDidMount () {
    YT.getList(this.props.playlistId)
  }

  render () {
    return (
      <Player playlistId={this.props.playlistId} />
    )
  }
}

PlayerContainer.propTypes = {
  playlistId: PropTypes.string
}

function mapStateToProps (state) {
  return {
    playlistId: state.concert.playlistId
  }
}

export default connect(mapStateToProps, null)(PlayerContainer)
