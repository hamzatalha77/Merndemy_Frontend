import React, { useEffect, useMemo } from 'react'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { useDispatch, useSelector } from 'react-redux'
import { listSubCategoriesForCategory } from '../redux/actions/subCategoryActions'

import { Link } from 'react-router-dom'
const SubCategoriesScreen = ({ match }) => {
  const categoryId = match.params.categoryId

  const dispatch = useDispatch()
  const subCategoryForCategoryList = useSelector(
    (state) => state.subCategoryForCategoryList
  )
  const {
    subCategories,
    loading: loadingSubCategories,
    error: errorSubCategories
  } = subCategoryForCategoryList

  useEffect(() => {
    dispatch(listSubCategoriesForCategory(categoryId))
  }, [dispatch, categoryId])

  const memoizedSubCategories = useMemo(() => subCategories, [subCategories])

  return (
    <CardGroup>
      {memoizedSubCategories?.map((subCategory) => (
        <Card key={subCategory._id}>
          <Card.Body>
            <Link
              to={`/shop/category/${categoryId}/subCategory/${subCategory._id}`}
            >
              <Card.Title>{subCategory.subCategory_name}</Card.Title>
            </Link>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated 3 mins ago</small>
          </Card.Footer>
        </Card>
      ))}
    </CardGroup>
  )
}

export default SubCategoriesScreen
