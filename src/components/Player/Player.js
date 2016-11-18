import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Player.css'

export const Player = ({ playlistId }) =>
  <div styleName="wrap">
    {playlistId}
  </div>

Player.propTypes = {
  playlistId: PropTypes.string
}

export default CSSModules(Player, styles, { allowMultiple: true })
