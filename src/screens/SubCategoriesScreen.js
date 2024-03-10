import React, { useEffect, useMemo } from 'react'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { useDispatch, useSelector } from 'react-redux'
import { listSubCategoriesForCategory } from '../redux/actions/subCategoryActions'
const SubCategoriesScreen = ({ match }) => {
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
    dispatch(listSubCategoriesForCategory())
  }, [dispatch])
  const memoizedSubCategories = useMemo(() => subCategories, [subCategories])
  return (
    <CardGroup>
      {memoizedSubCategories?.map((subCategory) => (
        <Card key={subCategory._id}>
          <Card.Body>
            <Card.Title>{subCategory.subCategory_name}</Card.Title>
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
