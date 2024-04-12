import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../redux/actions/productActions'
import axios from 'axios'
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants'
import { listCategories } from '../redux/actions/categoryActions'
import { listSubCategoriesForCategory } from '../redux/actions/subCategoryActions'

const ProductCreateScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState([])
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate
  } = productCreate

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  const subCategoryForCategoryList = useSelector(
    (state) => state.subCategoryForCategoryList
  )
  const {
    subCategories,
    loading: loadingSubCategories,
    error: errorSubCategories
  } = subCategoryForCategoryList

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCategories())

      if (successCreate) {
        dispatch({ type: PRODUCT_CREATE_RESET })
        history.push('/admin/productlist')
      }
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successCreate])

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value
    setCategory(selectedCategoryId)

    dispatch(listSubCategoriesForCategory(selectedCategoryId))
  }

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
    dispatch(
      createProduct({
        name,
        images,
        price,
        description,
        brand,
        category,
        subCategory,
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
        <h1>Create Product</h1>
        {loadingCreate && <Loader></Loader>}
        {errorCreate && <Message variant="danger"> {errorCreate} </Message>}

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

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" onChange={handleCategoryChange}>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="subcategory">
            <Form.Label>SubCategory</Form.Label>
            <Form.Control
              as="select"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="">Select Subcategory</option>
              {loadingSubCategories ? (
                <option>Loading...</option>
              ) : errorSubCategories ? (
                <option>{errorSubCategories}</option>
              ) : (
                subCategories.map((subCategory) => (
                  <option key={subCategory._id} value={subCategory._id}>
                    {subCategory.subCategory_name}
                  </option>
                ))
              )}
            </Form.Control>
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

          <Form.Group>
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
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Add New
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default ProductCreateScreen
