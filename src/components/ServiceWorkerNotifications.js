import { Component } from 'react'

export default class ServiceWorkerNotifications extends Component {
  static defaultProps = {
    readyMessage: 'This site is cached for offline use!',
    updatedMessage: 'New content is available please refresh.',
    offlineMessage: 'You are now offline, browsing from cache.',
    ready: false,
    updated: false,
    offline: false,
    reloadOnUpdate: true
  }

  state = {
    message: null
  }

  componentDidMount = () => {
    window.addEventListener('swReady', this.handleReady)
    window.addEventListener('swUpdated', this.handleUpdated)
    window.addEventListener('swOffline', this.handleOffline)
  }

  componentWillUnmount = () => {
    window.removeEventListener('swReady', this.handleReady)
    window.removeEventListener('swUpdated', this.handleUpdated)
    window.removeEventListener('swOffline', this.handleOffline)
  }

  reloadIfUpdated = () => {
    if (window.swUpdated) {
      console.log('New content available: reloading window')
      window.location.reload()
    }
  }

  handleReady = () => {
    if (!this.props.ready) return
    this.setState({ message: this.props.readyMessage })
  }

  handleUpdated = () => {
    window.swUpdated = true
    console.log('Window will reload on next render')
    if (!this.props.updated) return
    this.setState({ message: this.props.updatedMessage })
  }

  handleOffline = () => {
    if (!this.props.offline) return
    this.setState({ message: this.props.offlineMessage })
  }

  handleDismiss = () => {
    this.setState({ message: null })
  }

  render () {
    this.props.reloadOnUpdate && this.reloadIfUpdated()
    return null
  }
}
