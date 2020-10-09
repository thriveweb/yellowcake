import React, { Component, Fragment } from 'react'
import { X } from 'react-feather'

import './Popup.css'

class Popup extends Component {
  constructor(props) {
    super(props)
    this.state = { showPopup: false }
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }

  handleKeyDown = ev => {
    if (ev.keyCode === 13 && !this.state.showPopup) {
      // enter to open
      this.togglePopup()
    } else if (ev.keyCode === 27 && this.state.showPopup) {
      // escape to close
      this.togglePopup()
    }
  }

  render() {
    const { children } = this.props
    return (
      <Fragment>
        <div className="taCenter">
          <h3> Simple Popup Example</h3>
          <div
            className="Button"
            onClick={this.togglePopup.bind(this)}
            onKeyDown={this.handleKeyDown}
            tabIndex={0}
            aria-label="Toggle Popup"
            role="button"
          >
            Click To Launch Popup
          </div>
        </div>
        {this.state.showPopup ? (
          <div className="Popup-Overlay">
            <div
              className="Popup-Background"
              onClick={this.togglePopup.bind(this)}
              onKeyDown={this.handleKeyDown}
              tabIndex={0}
              aria-label="Toggle Popup"
              role="button"
            ></div>
            <div className="Popup-Inner">
              <X
                className="Popup-Close"
                onClick={this.togglePopup.bind(this)}
                onKeyDown={this.handleKeyDown}
                tabIndex={0}
                aria-label="Toggle Popup"
                role="button"
              />
              {children}
            </div>
          </div>
        ) : null}
      </Fragment>
    )
  }
}
export default Popup
