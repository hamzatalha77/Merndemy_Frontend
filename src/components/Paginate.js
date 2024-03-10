// Paginate.js

import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = '',
  categoryId = '',
  subCategoryId = ''
}) => {
  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/shop/search/${keyword}/page/${x + 1}`
                : categoryId && subCategoryId
                ? `/shop/category/${categoryId}/subCategory/${subCategoryId}/page/${
                    x + 1
                  }`
                : categoryId
                ? `/shop/category/${categoryId}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : null
}

export default Paginate
