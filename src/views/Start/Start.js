import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Start.css'

const height = window.innerHeight

export const Start = () =>
  <div style={{ height: height }} styleName="start">
    <img src="/static/images/logo.png" />
  </div>

Start.propTypes = {}

export default CSSModules(Start, styles, { allowMultiple: true })
