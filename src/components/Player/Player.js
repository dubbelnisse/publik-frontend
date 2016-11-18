import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Player.css'

export const Player = () =>
  <div styleName="wrap">
    <div id="player"></div>
  </div>

export default CSSModules(Player, styles, { allowMultiple: true })
