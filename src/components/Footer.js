import React from 'react'

import './Footer.css'
import InstagramFeed from './InstagramFeed'

export default ({ globalSettings, socialSettings, navLinks }) => (
  <div>
    <InstagramFeed count="8" />
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} All rights reserved. Crafted by{' '}
          <a href="https://thriveweb.com.au/">Thrive</a>.
        </span>
      </div>
    </footer>
  </div>
)
