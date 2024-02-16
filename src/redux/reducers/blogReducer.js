import {
  BLOG_CREATE_FAIL,
  BLOG_CREATE_REQUEST,
  BLOG_CREATE_RESET,
  BLOG_CREATE_SUCCESS
} from '../constants/blogConstants'

export const blogCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BLOG_CREATE_REQUEST:
      return { loading: true }
    case BLOG_CREATE_SUCCESS:
      return { loading: false, success: true, blog: action.payload }
    case BLOG_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case BLOG_CREATE_RESET:
      return {}
    default:
      return state
  }
}
