import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../redux/actions/orderActions'
import { ORDER_CREATE_RESET } from '../redux/constants/orderConstants'
import { USER_DETAILS_RESET } from '../redux/constants/userConstants'
import { applyCoupon } from '../redux/actions/couponActions'

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch()
  const [code, setCode] = useState('')
  const [discountedTotal, setDiscountedTotal] = useState(null)

  const cart = useSelector((state) => state.cart)

  const couponApply = useSelector((state) => state.couponApply)
  const { loading: loadingCoupon, error: errorCoupon, coupon } = couponApply

  if (!cart.shippingAddress.address) {
    history.push('/shipping')
  } else if (!cart.paymentMethod) {
    history.push('/payment')
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const orderCreate = useSelector((state) => state.orderCreate)
  const { order, success, error } = orderCreate

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: ORDER_CREATE_RESET })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, history, success])

  const placeOrderHandler = () => {
    const totalPriceToUse = discountedTotal ? discountedTotal : cart.totalPrice

    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: totalPriceToUse
      })
    )
  }

  useEffect(() => {
    if (coupon && coupon.message === 'Coupon code is valid') {
      const discountPercent = parseFloat(coupon.percent)
      const discountAmount = (cart.totalPrice * discountPercent) / 100
      const newTotal = (cart.totalPrice - discountAmount).toFixed(2)
      localStorage.setItem('discountedTotal', newTotal)
      setDiscountedTotal(newTotal)
    } else {
      setDiscountedTotal(null)
    }
  }, [coupon, cart.totalPrice])
  useEffect(() => {
    const savedDiscountedTotal = localStorage.getItem('discountedTotal')
    if (savedDiscountedTotal) {
      setDiscountedTotal(savedDiscountedTotal)
    }
  }, [])
  const submitCoupon = (e) => {
    e.preventDefault()
    dispatch(applyCoupon(code))
    setCode('')
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}
                {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {coupon && coupon.message === 'Coupon code is valid' && (
                  <Row>
                    <Col>Total After Discount</Col>
                    <Col>
                      ${discountedTotal ? discountedTotal : cart.totalPrice}
                    </Col>
                  </Row>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>
                    <Button
                      type="button"
                      onClick={submitCoupon}
                      className="btn-block"
                      disabled={loadingCoupon}
                    >
                      Apply Coupon
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
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                {errorCoupon && (
                  <Message variant="warning">{errorCoupon}</Message>
                )}
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
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
