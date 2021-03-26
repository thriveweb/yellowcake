import React from 'react'

import './SVGIcon.css'

const SVGIcon = ({ src }) => {
  const icon = {
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`
  }
  return (
    <div className="SVGIcon">
      <div className="SVGIcon--icon" style={icon} />
    </div>
  )
}

export default SVGIcon;