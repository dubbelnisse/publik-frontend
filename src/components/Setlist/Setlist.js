import React, { PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Setlist.css'
import SetlistItem from './SetlistItem'
import Link from '../Link'

export const Setlist = ({ setlist }) => {
  if (setlist.length === 0) { return null }

  return (
    <div>
      <div styleName="header">
        <p>Setlist</p>
        <Link text="Hide details" />
      </div>
      <div>
        {setlist.map((item, i) => (
          <SetlistItem
            key={`iteam-${i}`}
            number={i + 1}
            {...item} />
        ))}
      </div>
    </div>
  )
}

Setlist.propTypes = {
  setlist: PropTypes.arrayOf(PropTypes.object)
}

export default CSSModules(Setlist, styles, { allowMultiple: true })
