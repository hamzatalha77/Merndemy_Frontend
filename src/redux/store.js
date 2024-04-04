import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productWishlistReducer
} from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducer.js'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userWishlistReducer
} from './reducers/userReducer.js'
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
  orderDeleteReducer,
  orderDeleteAdminReducer
} from './reducers/orderReducer.js'
import {
  blogAddCommentReducer,
  blogCreateReducer,
  blogDeleteReducer,
  blogDetailsReducer,
  blogListReducer,
  blogUpdateReducer
} from './reducers/blogReducer.js'
import {
  categoryCreateReducer,
  categoryListReducer
} from './reducers/categoryReducer.js'
import {
  subCategoryCreateReducer,
  subCategoryForCategoryListReducer
} from './reducers/subCategoryReducer.js'
import { couponApplyReducer } from './reducers/couponReducer.js'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  productWishlist: productWishlistReducer,
  productTopRated: productTopRatedReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userWishlist: userWishlistReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  blogCreate: blogCreateReducer,
  blogDetails: blogDetailsReducer,
  blogList: blogListReducer,
  blogDelete: blogDeleteReducer,
  blogUpdate: blogUpdateReducer,
  categoryList: categoryListReducer,
  subCategoryForCategoryList: subCategoryForCategoryListReducer,
  orderDelete: orderDeleteReducer,
  orderDeleteAdmin: orderDeleteAdminReducer,
  blogAddComment: blogAddCommentReducer,
  categoryCreate: categoryCreateReducer,
  subCategoryCreate: subCategoryCreateReducer,
  couponApply: couponApplyReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
