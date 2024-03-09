import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  category = '',
  subCategory = ''
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/shop/search/${keyword}/page/${x + 1}`
                  : category && subCategory
                  ? `/shop/category/${category}/subCategory/${subCategory}/page/${
                      x + 1
                    }`
                  : category
                  ? `/shop/category/${category}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
