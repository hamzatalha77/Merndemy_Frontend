import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productActions'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import Paginate from '../components/Paginate'

const ShopScreen = ({ match }) => {
  const categoryId = match.params.categoryId
  const subCategoryId = match.params.subCategoryId
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber, categoryId, subCategoryId))
  }, [dispatch, keyword, pageNumber, categoryId, subCategoryId])

  return (
    <div>
      <Link to="/" className="btn btn-black">
        Go Back
      </Link>
      <Row>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h3>{error}</h3>
        ) : (
          <>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword || ''}
              categoryId={categoryId || ''}
              subCategoryId={subCategoryId || ''} // Corrected prop name
            />
          </>
        )}
      </Row>
    </div>
  )
}

export default ShopScreen
