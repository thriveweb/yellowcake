import React from 'react'
import { Link, graphql } from 'gatsby'

import './NavLink.css'

export default ({ className, children, ...props }) => (
  <Link {...props} className={`NavLink ${className || ''}`}>
    {children}
  </Link>
)
