import React from 'react'
import InstagramFeed from './InstagramFeed'
import './Footer.css'

export default () => (
  <div>    
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Copyright {new Date().getFullYear()} Tous droits réservés. Crée par{' '}
          <a href="https://www.massweb.fr/">MassWeb</a>.
        </span>
      </div>
    </footer>
  </div>
)
