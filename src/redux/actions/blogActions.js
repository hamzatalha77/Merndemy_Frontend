import axios from 'axios'
import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  BLOG_UPDATE_FAIL,
  BLOG_UPDATE_REQUEST,
  BLOG_UPDATE_SUCCESS
} from '../constants/blogConstants'
import { logout } from './userActions'
import { BASE_URL } from '../../constants'

export const createBlog = (blogData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_CREATE_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(`${BASE_URL}/api/blogs`, blogData, config)

    dispatch({
      type: BLOG_CREATE_SUCCESS,
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
      type: BLOG_CREATE_FAIL,
      payload: message
    })
  }
}
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_DETAILS_REQUEST
    })

    const {
      userLogin: { userInfo }
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`${BASE_URL}/api/blogs/${id}`, config)

    dispatch({
      type: BLOG_DETAILS_SUCCESS,
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
      type: BLOG_DETAILS_FAIL,
      payload: message
    })
  }
}

export const updateBlog = (blog) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BLOG_UPDATE_REQUEST
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
      `${BASE_URL}/api/blogs/${blog._id}`,
      blog,
      config
    )

    dispatch({ type: BLOG_UPDATE_SUCCESS })

    dispatch({ type: BLOG_DETAILS_SUCCESS, payload: data })

    dispatch({ type: BLOG_DETAILS_RESET })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BLOG_UPDATE_FAIL,
      payload: message
    })
  }
}
