import React from 'react'
import { MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'
const CommentsLits = () => {
  return (
    <MDBCardBody>
      <div className="d-flex flex-start align-items-center">
        <MDBCardImage
          className="rounded-circle shadow-1-strong me-3"
          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
          alt="avatar"
          width="60"
          height="60"
        />
        <div>
          <h6 className="fw-bold text-primary mb-1">Lily Coleman</h6>
          <p className="text-muted small mb-0">Shared publicly - Jan 2020</p>
        </div>
      </div>

      <p className="mt-3 mb-4 pb-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        consequat.
      </p>
    </MDBCardBody>
  )
}

export default CommentsLits
