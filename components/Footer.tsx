import React from 'react'
export const Footer = () => {
  return (
    <footer className="container py-5 flex-shrink-1">
      <div className="row">
        <div className="col-12 col-md d-flex justify-content-between align-items-center">
          <div className={'d-flex align-items-center'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="d-block"
              role="img"
              viewBox="0 0 24 24"
            >
              <title>App</title>
              <circle cx="12" cy="12" r="10" />
              <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94" />
            </svg>
            <span className="fw-bold fs-5 ms-2">Guacamole</span>
          </div>
          <small className="d-block text-body-secondary">&copy; {new Date().getFullYear()}</small>
        </div>
      </div>
    </footer>
  )
}
