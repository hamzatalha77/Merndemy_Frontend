import { categories } from '../data'
import CategoryItem from './CategoryItem'
const Categories = () => {
  return (
    <>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </>
  )
}

export default Categories
