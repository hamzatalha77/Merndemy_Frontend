import {
  COUPON_APPLY_FAIL,
  COUPON_APPLY_REQUEST,
  COUPON_APPLY_SUCCESS
} from '../constants/couponConstants'

export const couponApplyReducer = (state = {}, action) => {
  switch (action.type) {
    case COUPON_APPLY_REQUEST:
      return { loading: true }
    case COUPON_APPLY_SUCCESS:
      return { loading: false, coupon: action.payload }
    case COUPON_APPLY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
