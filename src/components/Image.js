import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Observer from './Observer'

import './Image.css'

class Image extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }

  imageSizes = [
    '320',
    '450',
    '640',
    '750',
    '800',
    '900',
    '1000',
    '1200',
    '1500',
    '1600',
    '2000'
  ] // image siezes used for image source sets

  state = {
    isIntersecting: false
  }

  handleIntersection = e => {
    if (e.isIntersecting) {
      this.setState({ isIntersecting: true })
    }
  }

  checkIsUploadcare(src) {
    return typeof src === 'string' && src.includes('ucarecdn.com')
  }

  render() {
    let {
      background,
      backgroundSize = 'cover',
      resolutions = '1000x',
      className = '',
      src,
      secSet = '',
      fullSrc,
      smallSrc,
      onClick,
      alt = '',
      lazy = true
    } = this.props

    const isUploadcare = this.checkIsUploadcare(src)
    /* create source set for images */
    if (isUploadcare) {
      secSet = this.imageSizes.map(size => {
        return `${src}-/progressive/yes/-/format/auto/-/preview/${size}x${size}/-/quality/lightest/${size}.jpg ${size}w`
      })
    }

    /* add resolutions options for inline images */
    if (resolutions === 'small') {
      resolutions = '800x'
    } else if (resolutions === 'medium') {
      resolutions = '1000x'
    } else if (resolutions === 'large') {
      resolutions = '2000x'
    }

    fullSrc = `${src}${
      isUploadcare
        ? '-/progressive/yes/-/format/auto/-/resize/' + resolutions + '/'
        : ''
    }`
    smallSrc = `${src}${
      isUploadcare ? '-/progressive/yes/-/format/auto/-/resize/10x/' : ''
    }`

    let style = {}
    if (background) {
      style = {
        backgroundImage: `url(${
          this.state.isIntersecting ? fullSrc : smallSrc
        })`,
        backgroundSize
      }
    }

    const fullImage = !isUploadcare || !lazy

    return (
      <Fragment>
        {isUploadcare &&
          lazy && (
            <Observer onChange={this.handleIntersection}>
              <span ref={this.ref}>
                {!background && (
                  <img
                    className={`LazyImage ${className}`}
                    src={this.state.isIntersecting ? fullSrc : smallSrc}
                    srcSet={this.state.isIntersecting ? secSet : ''}
                    sizes={'100vw'}
                    onClick={onClick}
                    alt={alt}
                  />
                )}
                {background && (
                  <div
                    className={`BackgroundImage absolute ${className}`}
                    style={style}
                  />
                )}
              </span>
            </Observer>
          )}
        {fullImage && (
          <Fragment>
            {background && (
              <div
                className={`BackgroundImage absolute ${className}`}
                style={style}
              />
            )}
            {!background && (
              <img
                className={`LazyImage ${className}`}
                src={fullSrc}
                srcSet={secSet}
                sizes={'100vw'}
                onClick={onClick}
                alt={alt}
              />
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired
}

export default Image
