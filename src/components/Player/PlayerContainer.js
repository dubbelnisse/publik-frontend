import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Player from './Player'
import { onYouTubeIframeAPIReady } from '../../utils/youtube'

export class PlayerContainer extends Component {
  componentDidMount () {
    setTimeout(() => {
      console.log(this.props.videoList)
      onYouTubeIframeAPIReady(this.props.videoList)
    }, 1000)
  }

  render () {
    return (
      <Player />
    )
  }
}

PlayerContainer.propTypes = {
  playlistId: PropTypes.string,
  videoList: PropTypes.string
}

function mapStateToProps (state) {
  return {
    playlistId: state.concert.playlistId,
    videoList: state.concert.videoList
  }
}

export default connect(mapStateToProps, null)(PlayerContainer)
