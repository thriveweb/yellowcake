import React from 'react'
import PropTypes from 'prop-types'

import './Image.css'

class Image extends React.Component {
  render() {
    let {
      background,
      backgroundSize = 'cover',
      className = '',
      src,
      onClick,
      sizes,
      alt
    } = this.props

    const imageSrc = src

    if (background) {
      let style = {}

      if (typeof imageSrc === 'string') {
        style = { backgroundImage: `url(${imageSrc})`, backgroundSize }
      }

      return (
        <div className={`BackgroundImage absolute ${className}`} style={style}>
          {!style.backgroundImage && (
            <Image
              src={imageSrc}
              alt={alt}
              style={{
                position: 'absolute',
                width: 'auto',
                height: 'auto'
              }}
              imgStyle={{
                objectFit: backgroundSize
              }}
            />
          )}
        </div>
      )
    }

    return (
      <img
        className={`Image ${className}`}
        src={imageSrc}
        sizes={sizes || '100vw'}
        onClick={onClick}
        alt={alt}
      />
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired
}

export default Image
