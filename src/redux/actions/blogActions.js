import axios from 'axios'
import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_SUCCESS
} from '../constants/blogConstants'
import { logout } from './userActions'

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

    const { data } = await axios.post(`/api/blogs`, blogData, config)

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
