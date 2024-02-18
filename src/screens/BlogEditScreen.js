import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { BLOG_UPDATE_RESET } from '../redux/constants/blogConstants'
import { getBlogDetails, updateBlog } from '../redux/actions/blogActions'
import axios from 'axios'

const BlogEditScreen = ({ match, history }) => {
  const blogId = match.params.id
  const [title, setTitle] = useState('')
  const [images, setImages] = useState([])
  const dispatch = useDispatch()

  const blogDetails = useSelector((state) => state.blogDetails)
  const { loading, error, blog } = blogDetails

  const blogUpdate = useSelector((state) => state.blogUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = blogUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: BLOG_UPDATE_RESET })
      history.push('/admin/blog-list')
    } else {
      if (!blog.title || blog._id !== blogId) {
        dispatch(getBlogDetails(blogId))
      } else {
        setTitle(blog.title)
        setImages(blog.images)
      }
    }
  }, [dispatch, blogId, blog, successUpdate, history])

  const handleImageUpload = async (e) => {
    const files = e.target.files
    const uploadedImages = []

    const uploaders = Array.from(files).map((file) => {
      const data = new FormData()
      data.append('file', file)
      data.append('upload_preset', 'siiqk1nf')

      return axios.post(
        'https://api.cloudinary.com/v1_1/deenyqw6o/image/upload',
        data
      )
    })

    try {
      const responses = await Promise.all(uploaders)
      responses.forEach((res) => {
        const fileUrl = res.data.url
        uploadedImages.push(fileUrl)
      })

      setImages(uploadedImages) // Update images with newly uploaded images only
    } catch (error) {
      console.error('Error uploading images:', error)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateBlog({ _id: blogId, title, images }))
  }

  return (
    <>
      <Link to="/admin/blog-list" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Row xs={1} md={2} className="g-4">
              {images.map((image, idx) => (
                <Col key={idx}>
                  <Card>
                    <Card.Img variant="top" src={image} />
                  </Card>
                </Col>
              ))}
            </Row>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Upload Images</Form.Label>
              <Form.Control
                type="file"
                size="lg"
                multiple
                onChange={handleImageUpload}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default BlogEditScreen
