import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Spinner
} from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../redux/actions/cartActions'
import { applyCoupon } from '../redux/actions/couponActions'
import { CART_APPLY_COUPON } from '../redux/constants/cartConstants'

const CartScreen = ({ match, location, history }) => {
  const [code, setCode] = useState('')
  const [discountedTotal, setDiscountedTotal] = useState(null)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [isCouponApplied, setIsCouponApplied] = useState(false) // Flag to track if coupon has been applied
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const couponApply = useSelector((state) => state.couponApply)
  const { loading, error, coupon } = couponApply

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping')
  }

  const submitCoupon = (e) => {
    e.preventDefault()
    dispatch(applyCoupon(code))
  }

  const finalTotal = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2)

  useEffect(() => {
    if (coupon && coupon.message === 'Coupon code is valid') {
      const discountPercent = parseFloat(coupon.percent)
      if (!isNaN(discountPercent)) {
        const discountAmount = (finalTotal * discountPercent) / 100
        const newDiscountedTotal = (finalTotal - discountAmount).toFixed(2)
        setDiscountedTotal(newDiscountedTotal)
        setAppliedCoupon(coupon.percent)
        if (!isCouponApplied) {
          dispatch({ type: CART_APPLY_COUPON, payload: { discountPercent } })
          setIsCouponApplied(true) // Set the flag to true after dispatching
        }
      } else {
        setDiscountedTotal(finalTotal)
        setAppliedCoupon(null)
      }
    } else {
      setDiscountedTotal(finalTotal)
      setAppliedCoupon(null)
    }
  }, [coupon, finalTotal, isCouponApplied, dispatch])

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart Is Empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>$ {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                item
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col> ${finalTotal}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total after discount</Col>
                <Col>
                  $
                  {loading ? (
                    <Spinner animation="border" />
                  ) : discountedTotal !== null ? (
                    discountedTotal
                  ) : (
                    finalTotal
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <Button
                    type="button"
                    onClick={submitCoupon}
                    className="btn-block"
                    disabled={loading}
                  >
                    {loading ? 'Applying...' : 'Apply Coupon'}
                  </Button>
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter Coupon"
                  />
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {appliedCoupon && (
                <Message variant="success">
                  Coupon applied! You got {appliedCoupon}% discount.
                </Message>
              )}
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                justifyContent: 'center',
                display: 'flex'
              }}
            >
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
