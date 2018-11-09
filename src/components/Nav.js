import React, { Component } from 'react'
import { Location } from '@reach/router'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'

import Logo from './Logo'
import './Nav.css'

export class Navigation extends Component {
  state = {
    active: false,
    currentPath: false
  }

  componentDidMount() {
    this.setState({ currentPath: this.props.location.pathname })
  }

  handleMenuToggle = () => this.setState({ active: !this.state.active })

  // Only close nav if it is open
  handleLinkClick = () => this.state.active && this.handleMenuToggle()

  render() {
    const { active } = this.state
    const { subNav } = this.props

    const NavLink = ({ to, className, children, ...props }) => {
      const isActive = to === this.state.currentPath ? 'active' : ''

      return (
        <Link
          to={to}
          className={`NavLink ${isActive} ${className}`}
          onClick={this.handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )
    }

    const NavGroup = ({ to, className, children, noLink, ...props }) => {
      return <div className="Nav--Group">{children}</div>
    }

    return (
      <nav className={`Nav ${active ? 'Nav-active' : ''}`}>
        <div className="Nav--Container container">
          <Link to="/" onClick={this.handleLinkClick}>
            <Logo />
          </Link>
          <div className="Nav--Links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about/">About</NavLink>
            <NavLink to="/blog/">Blog</NavLink>
            <NavGroup to="/Posts/" noLink>
              <span className="NavLink">Posts</span>
              {subNav.posts.map((link, index) => {
                return (
                  <NavLink to={link.slug} key={'posts-subnav-link-' + index}>
                    {link.title}
                  </NavLink>
                )
              })}
            </NavGroup>
            <NavLink to="/default/">Default</NavLink>
            <NavLink to="/contact/">Contact</NavLink>
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

export default ({ subNav }) => {
  return (
    <Location>{route => <Navigation subNav={subNav} {...route} />}</Location>
  )
}
