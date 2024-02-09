import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
const Product = ({ product }) => {
  const maxLength = 40
  const truncateName = (name) => {
    return name.length > maxLength ? name.substring(0, maxLength) + '...' : name
  }
  return (
    <Card
      className="my-3 p-3 rounded"
      style={{ width: '18rem', height: '26rem' }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ width: '200px', height: '200px' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong className="product-name">
              {truncateName(product.name)}
            </strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
