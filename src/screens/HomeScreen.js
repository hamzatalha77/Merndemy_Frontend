import React, { useEffect, useState } from 'react'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Form } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../redux/actions/productActions'
import { listCategories } from '../redux/actions/categoryActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

const HomeScreen = ({ match }) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, selectedCategory))
    dispatch(listCategories())
  }, [dispatch, keyword, pageNumber, selectedCategory])

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-black">
          Go Back
        </Link>
      )}

      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Form.Group as={Col} controlId="categorySelect">
              <Form.Label>Filter by Category:</Form.Label>
              <Form.Select
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
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
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
