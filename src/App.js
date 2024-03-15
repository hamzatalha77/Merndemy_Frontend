import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import BlogCreateScreen from './screens/BlogCreateScreen'
import BlogListScreen from './screens/BlogListScreen'
import BlogEditScreen from './screens/BlogEditScreen'
import ProductCreateScreen from './screens/ProductCreateScreen'
import ShopScreen from './screens/ShopScreen'
import SubCategoriesScreen from './screens/SubCategoriesScreen'
import BlogScreen from './screens/BlogScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/order/:id" component={OrderScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/admin/blog/create-blog" component={BlogCreateScreen} />
          <Route path="/admin/blog-list" component={BlogListScreen} />
          <Route path="/admin/blog/:id/edit" component={BlogEditScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userList" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />
          <Route path="/blog/:id/" component={BlogScreen} />
          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route path="/admin/create-product" component={ProductCreateScreen} />
          <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
          <Route path="/admin/orderlist" component={OrderListScreen} />
          <Route path="/category/:categoryId" component={SubCategoriesScreen} />

          <Route path="/shop" component={ShopScreen} exact />
          <Route
            path="/shop/category/:categoryId"
            component={ShopScreen}
            exact
          />

          <Route
            path="/shop/category/:categoryId/subCategory/:subCategoryId"
            component={ShopScreen}
            exact
          />
          <Route
            path="/shop/category/:categoryId/subCategory/:subCategoryId/page/:pageNumber"
            component={ShopScreen}
            exact
          />
          <Route
            path="/shop/subCategory/:subCategoryId"
            component={ShopScreen}
            exact
          />

          <Route path="/shop/search/:keyword" component={ShopScreen} exact />

          <Route
            path="/shop/search/:keyword/page/:pageNumber"
            component={ShopScreen}
          />
          <Route path="/shop/page/:pageNumber" component={ShopScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
