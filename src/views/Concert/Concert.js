import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Concert.css'

import Setlist from '../../components/Setlist'

export const Concert = () =>
  <div styleName="wrap">
    <div styleName="setlist">
      <Setlist />
    </div>
  </div>

Concert.propTypes = {}

export default CSSModules(Concert, styles, { allowMultiple: true })
