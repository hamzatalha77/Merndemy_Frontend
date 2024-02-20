import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  listProductDetails,
  updateProduct
} from '../redux/actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../redux/constants/productConstants'
import axios from 'axios'
const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState([])
  const [newImages, setNewImages] = useState([])
  const [brand, setBrand] = useState('')
  const [categories, setCategories] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate
  } = productUpdate

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    } else if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImages(product.images)
        setBrand(product.brand)
        setCategories(product.categories)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate, userInfo])

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

      setNewImages([...newImages, ...uploadedImages])
    } catch (error) {
      console.error('Error uploading images:', error)
    }
  }

  const deleteImage = (index) => {
    const updatedImages = [...images]
    updatedImages.splice(index, 1)
    setImages(updatedImages)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const updatedImages = [...images, ...newImages]
    dispatch(
      updateProduct({
        _id: productId,
        name,
        images: updatedImages,
        price,
        description,
        brand,
        categories,
        countInStock
      })
    )
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader></Loader>}
        {errorUpdate && <Message variant="danger"> {errorUpdate} </Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <div>
              <h5>Current Images</h5>
              <Row xs={2} md={3} lg={4} className="g-4">
                {images.map((image, index) => (
                  <Col key={index}>
                    <Card>
                      <Card.Img variant="top" src={image} />
                      <Card.Body>
                        <Button
                          variant="danger"
                          onClick={() => deleteImage(index)}
                        >
                          Delete
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>

            <Form.Group controlId="newImages">
              <Form.Label>New Images</Form.Label>
              <Form.Control type="file" multiple onChange={handleImageUpload} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Count </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count in Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Updates
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
