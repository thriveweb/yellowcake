import React from 'react'
import PropTypes from 'prop-types'

// import 'intersection-observer'
// import Observer from '@researchgate/react-intersection-observer'

import './Image.css'

class Image extends React.Component {
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
    if (typeof src === 'String' && src.includes('ucarecdn.com')) return false
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
      secSet = `
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/320x/320.jpg 320w,
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/450x/450.jpg 450w,
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/640x/640.jpg 640w,
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/750x/750.jpg 750w,
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/800x/800.jpg 800w,
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/900x/900.jpg 900w,
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/1000x/1000x/-/quality/lightest/1000.jpg 1000w,
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/1200x/1200x/-/quality/lightest/1200.jpg 1200w,
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/1500x/1500x/-/quality/lightest/1500.jpg 1500w,
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/1600x/1600x/-/quality/lightest/1600.jpg 16000w,
      ${src}-/progressive/yes/-/format/auto/-/scale_crop/2000x/2000x/-/quality/lightest/2000.jpg 2000w`
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
