import React from 'react'
import { MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'

const CommentsList = ({ name, text, avatar }) => {
  return (
    <MDBCardBody>
      <div className="d-flex flex-start align-items-center">
        <MDBCardImage
          className="rounded-circle shadow-1-strong me-3"
          src={avatar}
          alt="avatar"
          width="60"
          height="60"
        />
        <div>
          <h6 className="fw-bold text-primary mb-1">{name} </h6>
          <p className="text-muted small mb-0">Shared publicly - Jan 2020</p>
        </div>
      </div>

      <p className="mt-3 mb-4 pb-2">{text}</p>
    </MDBCardBody>
  )
}

export default CommentsList
