import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productActions'
import { listSubCategoriesForCategory } from '../redux/actions/subCategoryActions'
import { listCategories } from '../redux/actions/categoryActions'
import { Col, Row, Form } from 'react-bootstrap'
import Product from '../components/Product'
import Paginate from '../components/Paginate'

const ShopScreen = ({ match }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubCategory, setSelectedSubCategory] = useState('')
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
  const history = useHistory()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

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
    dispatch(listCategories())
  }, [dispatch])

  useEffect(() => {
    if (selectedCategory) {
      dispatch(listSubCategoriesForCategory(selectedCategory))
      history.push(`/shop/category/${selectedCategory}`)
    }
  }, [dispatch, selectedCategory, history])

  useEffect(() => {
    if (selectedSubCategory) {
      history.push(
        `/shop/category/${selectedCategory}/subCategory/${selectedSubCategory}`
      )
    }
  }, [selectedSubCategory, selectedCategory, history])

  useEffect(() => {
    dispatch(
      listProducts(keyword, pageNumber, selectedCategory, selectedSubCategory)
    )
  }, [dispatch, keyword, pageNumber, selectedCategory, selectedSubCategory])

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value
    setSelectedCategory(selectedCategoryId)
    setSelectedSubCategory('')
    history.push(`/shop/category/${selectedCategoryId}`)
  }

  const handleSubCategoryChange = (e) => {
    const selectedSubCategoryId = e.target.value
    setSelectedSubCategory(selectedSubCategoryId)
    history.push(
      `/shop/category/${selectedCategory}/subCategory/${selectedSubCategoryId}`
    )
  }

  return (
    <div>
      <Link to="/" className="btn btn-black">
        Go Back
      </Link>
      <Row>
        <Form.Group as={Col} controlId="categorySelect">
          <Form.Label>Filter by Category:</Form.Label>
          <Form.Select onChange={handleCategoryChange} value={selectedCategory}>
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        <Form.Group as={Col} controlId="subCategorySelect">
          <Form.Label>Filter by SubCategory:</Form.Label>
          <Form.Select
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
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
          </Form.Select>
        </Form.Group>
      </Row>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
      <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
    </div>
  )
}

export default ShopScreen
