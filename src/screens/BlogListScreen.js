import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteBlog, listBlogs } from '../redux/actions/blogActions'

const BlogListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1
  const dispatch = useDispatch()

  const blogList = useSelector((state) => state.blogList)
  const { loading, error, blogs } = blogList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const blogDelete = useSelector((state) => state.blogDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete
  } = blogDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBlogs('', pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you Sure')) {
      dispatch(deleteBlog(id))
    }
  }

  return (
    <>
      <h1>Blogs</h1>
      <Col className="text-right">
        <Link to="/admin/blog/create-blog" className="btn btn-black">
          <i className="fas fa-plus">Create Blog</i>
        </Link>
      </Col>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger"> {errorDelete} </Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <LinkContainer to={`/blog/${blog._id}`}>
                  <td>{blog._id} </td>
                </LinkContainer>
                <td>{blog.title} </td>

                <td>
                  <LinkContainer to={`/admin/blog/${blog._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(blog._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default BlogListScreen
