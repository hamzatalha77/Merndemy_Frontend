import { Link } from 'react-router-dom'
const CategoryItem = ({ item }) => {
  return (
    <>
      <Link to={`/products/${item.cat}`}>
        <h4>{item.cat}</h4>
      </Link>
    </>
  )
}

export default CategoryItem
