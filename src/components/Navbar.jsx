import React from 'react';
import Link from 'next/link'
import 'bulma/css/bulma.css'

function Navbar(props) {
    return (
        <>
        
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
    </a>

    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu ">
    <div className="navbar-start">
      <Link href='/home' className="navbar-item">
        Home
      </Link>

      <Link href={'/documentation'} className="navbar-item">
        Documentation
      </Link>

      <div className="navbar-item has-dropdown is-hoverable">
        <Link href={'/'} className="navbar-link">
          More
        </Link>

        <div href={'/about'} className="navbar-dropdown">
          <Link href={'/about'} className="navbar-item">
            About
          </Link>
          <Link href={'/'} className="navbar-item">
            Jobs
          </Link>
          <Link href={'/contact'} className="navbar-item">
            Contact
          </Link>
          <hr className="navbar-divider" />
          <Link href={'/'} className="navbar-item">
            Report an issue
          </Link>
        </div>
      </div>
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <a className="button is-primary">
            <strong>Sign up</strong>
          </a>
          <Link href={'/'} className="button is-light">
            Log in
          </Link>
        </div>
      </div>
    </div>
  </div>
</nav>
</>
    );
}

export default Navbar;