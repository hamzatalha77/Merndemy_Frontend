import axios from 'axios'
import {
  CATEGORY_LIST_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS
} from '../constants/categoryConstants'
import { DEPLOY_URL } from '../../constants'
import { logout } from './userActions'

export const listCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST
    })

    const { data } = await axios.get(
      `${DEPLOY_URL}/api/categories/category/all`
    )

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
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
      type: CATEGORY_LIST_FAIL,
      payload: message
    })
  }
}
