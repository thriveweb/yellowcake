import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import Image from './Image'

import './BackgroundVideo.css'

class BackgroundVideo extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  state = {
    playing: false,
    mobileWidth: false
  }

  updateDimensions() {
    this.setState({ mobileWidth: window.innerWidth <= 900 })
  }

  handelPlay() {
    this.setState({ playing: true })
    ReactDOM.findDOMNode(this.ref.current).removeEventListener(
      'playing',
      this.handelPlay
    )
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener('resize', () => this.updateDimensions())
    ReactDOM.findDOMNode(this.ref.current).addEventListener('playing', e =>
      this.handelPlay(e)
    )
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  render() {
    const { poster, videoTitle, children } = this.props
    return (
      <Fragment>
        {!this.state.mobileWidth && (
          <div className={`BackgroundVideo`}>
            <video
              ref={this.ref}
              poster={poster}
              className={`BackgroundVideo--video ${
                this.state.playing ? 'playing' : ''
              } `}
              playsInline
              autoPlay
              muted
              loop
              preload="auto"
            >
              {children}
            </video>
            {videoTitle && (
              <div className="BackgroundVideo--videoTitle">{videoTitle}</div>
            )}
          </div>
        )}
        {this.state.mobileWidth && (
          <Fragment>
            <Image background src={poster} alt="Background poster" />
            {videoTitle && <h3 className="Poster--videoTitle">{videoTitle}</h3>}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

export default BackgroundVideo
