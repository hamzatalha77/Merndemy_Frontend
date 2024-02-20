import React, { useEffect, useState } from 'react'
import { Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../redux/actions/blogActions'
import axios from 'axios'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { BLOG_CREATE_RESET } from '../redux/constants/blogConstants'

const BlogCreateScreen = ({ history, match }) => {
  const [title, setTitle] = useState('')
  const [images, setImages] = useState([])
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const blogCreate = useSelector((state) => state.blogCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate
  } = blogCreate

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      if (successCreate) {
        dispatch({ type: BLOG_CREATE_RESET })
        history.push('/admin/blog-list')
      }
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successCreate, userInfo])

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

      setImages([...images, ...uploadedImages])
    } catch (error) {
      console.error('Error uploading images:', error)
    }
  }

  const removeImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createBlog({ title, images }))
  }

  return (
    <>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {successCreate && (
        <Message variant="success">Blog created successfully</Message>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formFileLg" className="mb-3">
          <Form.Label>Upload Images</Form.Label>
          <Form.Control
            type="file"
            size="lg"
            multiple
            onChange={handleImageUpload}
          />
        </Form.Group>

        <div>
          {images.map((image, index) => (
            <div
              key={index}
              style={{ display: 'inline-block', marginRight: '10px' }}
            >
              <Image
                src={image}
                alt="Uploaded"
                rounded
                style={{ width: '100px', height: '100px' }}
              />
              <Button variant="danger" onClick={() => removeImage(index)}>
                Remove
              </Button>
            </div>
          ))}
        </div>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}

export default BlogCreateScreen
