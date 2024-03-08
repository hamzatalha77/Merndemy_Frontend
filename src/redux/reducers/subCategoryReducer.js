import {
  SUBCATEGORY_LIST_FAIL,
  SUBCATEGORY_LIST_REQUEST,
  SUBCATEGORY_LIST_SUCCESS
} from '../constants/subCategoryConstants'

export const subCategoryListReducer = (
  state = { subCategories: [] },
  action
) => {
  switch (action.type) {
    case SUBCATEGORY_LIST_FAIL:
      return { loading: true, subCategories: [] }
    case SUBCATEGORY_LIST_REQUEST:
      return {
        loading: false,
        subCategories: action.payload.subCategories,
        pages: action.payload.pages,
        page: action.payload.page
      }
    case SUBCATEGORY_LIST_SUCCESS:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
export const subCategoryForCategoryListReducer = (
  state = { loading: false, subCategories: [] },
  action
) => {
  switch (action.type) {
    case SUBCATEGORY_LIST_REQUEST:
      return { loading: true, subCategories: [] }
    case SUBCATEGORY_LIST_SUCCESS:
      return { loading: false, subCategories: action.payload }
    case SUBCATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
