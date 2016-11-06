import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Link.css'

export const Link = ({ text }) => {
  return (
    <p styleName="wrap">
      {text}
    </p>
  )
}

Link.propTypes = {
  text: PropTypes.string
}

export default CSSModules(Link, styles, { allowMultiple: true })
