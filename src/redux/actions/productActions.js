import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAIL,
  PRODUCT_ADD_TO_WISHLIST_REQUEST,
  PRODUCT_ADD_TO_WISHLIST_SUCCESS,
  PRODUCT_ADD_TO_WISHLIST_FAIL,
  PRODUCT_REMOVE_FROM_WISHLIST_REQUEST,
  PRODUCT_REMOVE_FROM_WISHLIST_SUCCESS,
  PRODUCT_REMOVE_FROM_WISHLIST_FAIL,
  PRODUCT_DETAILS_RESET
} from '../constants/productConstants'
import { logout, updateUserWishlist } from './userActions'
import { BASE_URL } from '../../constants'

export const listProducts =
  (keyword = '', pageNumber = '', category = '', subCategory = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })

      let url = `${BASE_URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`

      if (category) {
        url += `&category=${category}`
      }
      if (subCategory) {
        url += `&subCategory=${subCategory}`
      }

      const { data } = await axios.get(url)

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
      })
    }
  }

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`${BASE_URL}/api/products/${id}`)

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    await axios.delete(`${BASE_URL}/api/products/${id}`, config)

    dispatch({
      type: PRODUCT_DELETE_SUCCESS
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message
    })
  }
}

export const createProduct = (productData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(
      `${BASE_URL}/api/products`,
      productData,
      config
    )

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload: message
    })
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_UPDATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(
      `${BASE_URL}/api/products/${product._id}`,
      product,
      config
    )

    dispatch({ type: PRODUCT_UPDATE_SUCCESS })

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })

    dispatch({ type: PRODUCT_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message
    })
  }
}

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REVIEW_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      await axios.post(
        `${BASE_URL}/api/products/${productId}/reviews`,
        review,
        config
      )

      dispatch({
        type: PRODUCT_CREATE_REVIEW_SUCCESS
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: PRODUCT_CREATE_REVIEW_FAIL,
        payload: message
      })
    }
  }

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST })

    const { data } = await axios.get(`${BASE_URL}/api/products/top`)

    dispatch({
      type: PRODUCT_TOP_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: PRODUCT_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}

export const productAddToWishlist =
  (productId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_ADD_TO_WISHLIST_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.put(
        `${BASE_URL}/api/products/wishlist`,
        { productId },
        config
      )

      dispatch({
        type: PRODUCT_ADD_TO_WISHLIST_SUCCESS,
        payload: data
      })

      dispatch(updateUserWishlist(data.wishlist))
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: PRODUCT_ADD_TO_WISHLIST_FAIL,
        payload: message
      })
    }
  }

export const productRemoveFromWishlist =
  (productId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_REMOVE_FROM_WISHLIST_REQUEST
      })

      const {
        userLogin: { userInfo }
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`
        }
      }

      const { data } = await axios.put(
        `${BASE_URL}/api/products/wishlist`,
        { productId },
        config
      )

      dispatch({
        type: PRODUCT_REMOVE_FROM_WISHLIST_SUCCESS,
        payload: data
      })

      dispatch(updateUserWishlist(data.wishlist))
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({
        type: PRODUCT_REMOVE_FROM_WISHLIST_FAIL,
        payload: message
      })
    }
  }
