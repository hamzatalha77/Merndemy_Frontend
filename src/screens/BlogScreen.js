import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogDetails } from '../redux/actions/blogActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
const BlogScreen = ({ match, history }) => {
  const [Title, setTitle] = useState('')
  const [loadingBlog, setLoadingBlog] = useState(true)
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const blogDetails = useSelector((state) => state.blogDetails)
  const { loading, error, blog } = blogDetails

  useEffect(() => {
    setLoadingBlog(false)
    dispatch(getBlogDetails(match.params.id))
      .then(() => setLoadingBlog(false))
      .catch(() => setLoadingBlog(false))
  }, [dispatch, match])

  return (
    <section className="text-gray-600 body-font">
      {loadingBlog ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container px-5 py-24 mx-auto flex flex-col">
          <div className="lg:w-4/6 mx-auto">
            <div className="flex flex-col sm:flex-row mt-10">
              <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div className="flex flex-col items-center text-center justify-center">
                  <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">
                    Phoebe Caulfield
                  </h2>
                  <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                  <p className="text-base">{blog.title}</p>
                </div>
              </div>
              <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p className="leading-relaxed text-lg mb-4">
                  Meggings portland fingerstache lyft, post-ironic fixie man bun
                  banh mi umami everyday carry hexagon locavore direct trade art
                  party. Locavore small batch listicle gastropub farm-to-table
                  lumbersexual salvia messenger bag. Coloring book flannel
                  truffaut craft beer drinking vinegar sartorial, disrupt
                  fashion axe normcore meh butcher. Portland 90's scenester
                  vexillologist forage post-ironic asymmetrical, chartreuse
                  disrupt butcher paleo intelligentsia pabst before they sold
                  out four loko. 3 wolf moon brooklyn.
                </p>
                <a className="text-indigo-500 inline-flex items-center">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default BlogScreen
