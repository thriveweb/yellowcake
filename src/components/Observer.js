import { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Observer extends Component {
  isIntersecting = false

  getCurrentScrollPos() {
    const supportPageOffset = window.pageXOffset !== undefined,
      isCSS1Compat = (document.compatMode || '') === 'CSS1Compat'
    return supportPageOffset
      ? window.pageYOffset
      : isCSS1Compat
        ? document.documentElement.scrollTop
        : document.body.scrollTop
  }

  handleScroll() {
    let threshold = this.getCurrentScrollPos() + window.innerHeight
    if (
      !this.isIntersecting &&
      this.ref.current !== null &&
      ReactDOM.findDOMNode(this.ref.current).getBoundingClientRect().top <=
        threshold
    ) {
      this.isIntersecting = true
      this.props.onChange(this)
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  componentDidMount() {
    this.ref = this.props.children.ref
    window.addEventListener('scroll', e => this.handleScroll(e))
    this.handleScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    const { children } = this.props
    return children
  }
}
