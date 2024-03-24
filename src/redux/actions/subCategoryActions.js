import axios from 'axios'
import {
  SUBCATEGORY_LIST_FAIL,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS
} from '../constants/subCategoryConstants'
import { BASE_URL } from '../../constants'

export const listSubCategoriesForCategory =
  (categoryId) => async (dispatch) => {
    try {
      dispatch({ type: SUBCATEGORY_LIST_REQUEST })

      const { data } = await axios.get(
        `${BASE_URL}/api/subCategories/category/${categoryId}`
      )

      dispatch({
        type: SUBCATEGORY_LIST_SUCCESS,
        payload: data.subCategories
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch({
        type: SUBCATEGORY_LIST_FAIL,
        payload: message
      })
    }
  }

// import { logout } from './userActions'

// export const listSubCategories = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: SUBCATEGORY_LIST_REQUEST
//     })

//     const { data } = await axios.get(`${BASE_URL}/api/subCategories/`)

//     dispatch({
//       type: SUBCATEGORY_LIST_SUCCESS,
//       payload: data
//     })
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message
//     if (message === 'Not authorized, token failed') {
//       dispatch(logout())
//     }
//     dispatch({
//       type: SUBCATEGORY_LIST_FAIL,
//       payload: message
//     })
//   }
// }
