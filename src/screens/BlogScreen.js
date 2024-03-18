import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentBlog, getBlogDetails } from '../redux/actions/blogActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

import { Link } from 'react-router-dom'
import {
  MDBBtn,
  MDBCard,
  MDBCardFooter,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTextArea
} from 'mdb-react-ui-kit'
import { io } from 'socket.io-client'
import CommentsList from '../components/CommentsList'

const socket = io('/', {
  reconnection: true
})
const BlogScreen = ({ match }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [commentsRealTime, setCommentsRealTime] = useState([])

  const [loadingBlog, setLoadingBlog] = useState(true)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const blogDetails = useSelector((state) => state.blogDetails)
  const { loading, error, blog } = blogDetails

  const blogAddComment = useSelector((state) => state.blogAddComment)
  const {
    success: successBlogComment,
    loading: loadingBlogComment,
    error: errorBlogComment
  } = blogAddComment

  useEffect(() => {
    setLoadingBlog(true)
    dispatch(getBlogDetails(match.params.id))
      .then(() => setLoadingBlog(false))
      .catch(() => setLoadingBlog(false))
  }, [dispatch, match])

  useEffect(() => {
    socket.on('new-comment', (newComment) => {
      setCommentsRealTime(newComment)
    })
  })

  useEffect(() => {
    if (successBlogComment) {
      setComment('')
    }
  }, [successBlogComment, userInfo])

  useEffect(() => {
    if (blog && blog.comments) {
      setComments(blog.comments)
    }
  }, [blog, comment])

  const addComment = (e) => {
    e.preventDefault()
    dispatch(addCommentBlog(match.params.id, { comment }))
  }

  let uiCommentUpdate =
    commentsRealTime.length > 0 ? commentsRealTime : comments
  return (
    <section className="text-gray-600 body-font">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                    {blog.title}
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4">{blog.content}</p>
              </div>
            </div>
          </div>
          <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">
              <MDBRow className="justify-content-center">
                <MDBCol md="12" lg="10" xl="8">
                  <MDBCard>
                    {uiCommentUpdate.map((comment, index) => (
                      <CommentsList
                        key={index}
                        name={comment.postedBy.name}
                        text={comment.text}
                      />
                    ))}
                    {userInfo ? (
                      <form onSubmit={addComment}>
                        <MDBCardFooter
                          className="py-3 border-0"
                          style={{ backgroundColor: '#f8f9fa' }}
                        >
                          <div className="d-flex flex-start w-100">
                            <MDBCardImage
                              className="rounded-circle shadow-1-strong me-3"
                              src={comment.postedBy.avatar}
                              alt={comment.text}
                              width="40"
                              height="40"
                            />
                            <MDBTextArea
                              id="textAreaExample"
                              rows={4}
                              style={{ backgroundColor: '#fff' }}
                              wrapperClass="w-100"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </div>
                          <div className="float-end mt-2 pt-1">
                            <MDBBtn size="sm" className="me-1">
                              Post comment
                            </MDBBtn>
                            <MDBBtn outline size="sm">
                              Cancel
                            </MDBBtn>
                          </div>
                        </MDBCardFooter>
                      </form>
                    ) : (
                      <Message>
                        Please <Link to="/login">sign In </Link>To Write a
                        Review
                      </Message>
                    )}
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>
        </div>
      )}
    </section>
  )
}

export default BlogScreen
