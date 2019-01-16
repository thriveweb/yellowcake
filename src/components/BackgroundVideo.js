import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './BackgroundVideo.css'

class BackgroundVideo extends Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  state = {
    playing: false
  }

  handelPlay(e) {
    this.setState({
      playing: true
    })
    ReactDOM.findDOMNode(this.ref.current).removeEventListener(
      'playing',
      this.handelPlay
    )
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.ref.current).addEventListener('playing', e =>
      this.handelPlay(e)
    )
  }

  render() {
    const { poster, children } = this.props
    return (
      <div className="BackgroundVideo">
        <video
          ref={this.ref}
          poster={poster}
          className={`BackgroundVideo--video ${
            this.state.playing ? 'playing' : ''
          }`}
          playsInline
          autoPlay
          muted
          preload="auto"
        >
          {children}
        </video>
      </div>
    )
  }
}

export default BackgroundVideo
