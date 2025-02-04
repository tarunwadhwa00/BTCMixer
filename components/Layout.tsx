import React, { ReactNode } from 'react'
import Link from 'next/link'
import { Footer } from './Footer'

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol
          id="aperture"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94" />
        </symbol>
        <symbol id="cart" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </symbol>
        <symbol id="chevron-right" viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
          />
        </symbol>
      </svg>
      <nav className="navbar navbar-expand-md bg-dark sticky-top border-bottom flex-shrink-1" data-bs-theme="dark">
        <div className="container">
          <a className="navbar-brand d-md-none" href="#">
            <svg className="bi" width="24" height="24">
              <use xlinkHref="#aperture" />
            </svg>
            Aperture
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvas"
            aria-controls="#offcanvas"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex={-1} id="#offcanvas" aria-labelledby="#offcanvasLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="#offcanvasLabel">
                Aperture
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav flex-grow-1 justify-content-between">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <svg className="bi" width="24" height="24">
                      <use xlinkHref="#aperture" />
                    </svg>
                  </a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/start">
                    Start Mix
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/status">
                    Mix Status
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/faqs">
                    FAQs
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className={'d-flex flex-fill'}>{children}</div>
      <Footer />
    </div>
  )
}

export default Layout
