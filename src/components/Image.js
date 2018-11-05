import React from 'react'
import PropTypes from 'prop-types'

// import 'intersection-observer'
// import Observer from '@researchgate/react-intersection-observer'

import './Image.css'

class Image extends React.Component {
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

  // state = {
  //   isIntersecting: false
  // }
  //
  // handleIntersection = e => {
  //   console.log(e.isIntersecting)
  //   if (e.isIntersecting) {
  //     this.setState({ isIntersecting: true })
  //   }
  // }

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
      secSet = '',
      fullSrc,
      // smallSrc,
      onClick,
      alt = ''
    } = this.props

    const isLocalImg = this.checkIfIsLocalSrc(src)
    /* create source set for images */
    if (!isLocalImg) {
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
      isLocalImg
        ? ''
        : '-/progressive/yes/-/format/auto/-/resize/' + resolutions + '/'
    }`
    // smallSrc = `${src}${
    //   isLocalImg ? '' : '-/progressive/yes/-/format/auto/-/resize/10x/'
    // }`

    if (background) {
      let style = {}
      style = {
        // backgroundImage: `url(${
        //   this.state.isIntersecting ? fullSrc : smallSrc
        // })`,
        backgroundImage: `url(${fullSrc})`,
        backgroundSize
      }
      return (
        // <Observer onChange={this.handleIntersection}>
        <div
          className={`BackgroundImage absolute ${className}`}
          style={style}
        />
        // </Observer>
      )
    }

    return (
      // <Observer onChange={this.handleIntersection}>
      <img
        className={`LazyImage ${className}`}
        src={fullSrc}
        srcSet={secSet}
        // src={this.state.isIntersecting ? fullSrc : smallSrc}
        // srcSet={this.state.isIntersecting ? secSet : ''}
        sizes={'100vw'}
        onClick={onClick}
        alt={alt}
      />
      // </Observer>
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string.isRequired
}

export default Image
