import React, { Component } from 'react'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'

import { Location } from '@reach/router'

import Logo from './Logo'
import './Nav.css'

export class Navigation extends Component {
  currentPath = '/'
  state = {
    active: false
  }

  componentWillMount() {
    this.currentPath = this.props.location.pathname
  }

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  render() {
    const { active } = this.state

    const NavLink = ({ to, className, children, ...props }) => (
      <Link
        {...props}
        to={to}
        className={`NavLink ${className || ''} ${
          to === this.currentPath ? 'active' : ''
        }`}
        onClick={this.handleLinkClick}
      >
        {children}
      </Link>
    )

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink to="/" exact="true">
              Home
            </NavLink>
            <NavLink to="/about/" exact="true">
              About
            </NavLink>
            <NavLink to="/blog/" exact="true">
              Blog
            </NavLink>
            <NavLink to="/default/" exact="true">
              Default
            </NavLink>
            <NavLink to="/contact/" exact="true">
              Contact
            </NavLink>
          </div>
          <button
            className="Button-blank Nav--MenuButton"
            onClick={this.handleMenuToggle}
          >
            {active ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
    )
  }
}

export default () => (
  <Location>
    {({ navigate, location }) => <Navigation location={location} />}
  </Location>
)
