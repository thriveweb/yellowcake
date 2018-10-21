import React from 'react'

import './Image.css'

class Image extends React.Component {
  checkIfIsLocalSrc(src) {
    if (src.includes('ucarecdn.com')) return false
    return true
  }

  render() {
    let {
      background,
      backgroundSize = 'cover',
      resolutions = '1000x',
      className = '',
      src,
      srcset = '',
      onClick,
      alt = ''
    } = this.props
    const isLocalImg = this.checkIfIsLocalSrc(src)
    /* create source set for images */
    if (!isLocalImg) {
      srcset = `
      ${src}-/resize/320x/320.jpg 320w,
      ${src}-/resize/450x/450.jpg 450w,
      ${src}-/resize/640x/640.jpg 640w,
      ${src}-/resize/750x/750.jpg 750w,
      ${src}-/resize/800x/800.jpg 800w,
      ${src}-/resize/900x/900.jpg 900w,
      ${src}-/resize/1000x/-/quality/lighter/1000.jpg 1000w,
      ${src}-/resize/1200x/-/quality/lighter/1200.jpg 1200w,
      ${src}-/resize/1500x/-/quality/lighter/1500.jpg 1500w,
      ${src}-/resize/1600x/-/quality/lighter/1600.jpg 16000w,
      ${src}-/resize/2000x/-/quality/lightest/2000.jpg 2000w`
    }
    /* add resolutions options for inline images */
    if (resolutions === 'small') {
      resolutions = '800x'
    } else if (resolutions === 'medium') {
      resolutions = '1000x'
    } else if (resolutions === 'large') {
      resolutions = '2000x'
    }

    if (background) {
      let style = {}
      style = {
        backgroundImage: `url(${src}${isLocalImg ? '' : '/-/resize/2000x/'})`,
        backgroundSize
      }
      return (
        <div
          className={`BackgroundImage absolute ${className}`}
          style={style}
        />
      )
    }

    return (
      <img
        className={`Image ${className}`}
        src={`${src}${isLocalImg ? '' : '/-/resize/' + resolutions + '/'}`}
        srcSet={srcset}
        sizes={'100vw'}
        onClick={onClick}
        alt={alt}
      />
    )
  }
}

export default Image
