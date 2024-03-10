import { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import { listCategories } from '../redux/actions/categoryActions'
import { useDispatch, useSelector } from 'react-redux'

const Categories = () => {
  const dispatch = useDispatch()
  const categoryList = useSelector((state) => state.categoryList)
  const { categories } = categoryList

  useEffect(() => {
    dispatch(listCategories())
  }, [dispatch])

  const memoizedCategories = useMemo(() => categories, [categories])

  return (
    <CardGroup>
      {memoizedCategories?.map((category) => (
        <Card key={category._id}>
          <Card.Body>
            <Link to={`/category/${category._id}`}>
              <Card.Title>{category.category_name}</Card.Title>
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

export default Categories
