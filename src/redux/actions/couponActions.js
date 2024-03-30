import { axios } from 'axios'
import { BASE_URL } from '../../constants'
import {
  COUPON_APPLY_FAIL,
  COUPON_APPLY_REQUEST,
  COUPON_APPLY_SUCCESS
} from '../constants/couponConstants'

export const applyCoupon = (code) => async (dispatch) => {
  try {
    dispatch({
      type: COUPON_APPLY_REQUEST
    })

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const { data } = await axios.post(
      `${BASE_URL}/api/coupons/applyCoupon`,
      { code },
      config
    )

    dispatch({
      type: COUPON_APPLY_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: COUPON_APPLY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    })
  }
}
