import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './SetlistItem.css'
import classNames from 'classnames'

export const SetlistItem = ({ name, inPlaylist, number }) => {
  const info = classNames('info', {
    inPlaylist: inPlaylist
  })

  return (
    <div styleName="wrap">
      <div styleName={info}>
        <span styleName="number">{number}.</span>
        <span styleName="name">{name}</span>
      </div>
      {inPlaylist ?
        <div styleName="play">
          <i className="fa fa-play" />
        </div>:
        <div styleName="submit">Submit</div>
      }
    </div>
  )
}

SetlistItem.propTypes = {
  inPlaylist: PropTypes.bool,
  name: PropTypes.string,
  number: PropTypes.number
}

export default CSSModules(SetlistItem, styles, { allowMultiple: true })
