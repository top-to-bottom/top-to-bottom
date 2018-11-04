import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Login,
  Signup,
  UserHome,
  SingleProduct,
  listProducts,
  UsersList,
  addProduct,
  updateProduct,
  Orders,
  Home,
  CategoryList,
  singleUser,
  AdminHome,
  Navbar,
  Sidebar
} from './components'

import {me} from './store'
import {fetchUserCart} from './store/cart'
import Cart from './components/Cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    this.props.fetchCartData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <React.Fragment>
        <Route path="*" component={Navbar} />
        <Sidebar />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/products" component={listProducts} />
          <Route exact path="/products/add" component={addProduct} />
          <Route
            exact
            path="/products/category/:category"
            component={CategoryList}
          />
          <Route exact path="/products/:id/edit" component={updateProduct} />
          <Route exact path="/products/:id" component={SingleProduct} />
          <Route exact path="/users" component={UsersList} />
          <Route path="/users/:id" component={singleUser} />
          <Route path="/cart" component={Cart} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              {isAdmin && (
                <Switch>
                  {/* Routes placed here are only available for admins after logging in */}
                  <Route path="/home" component={AdminHome} />
                </Switch>
              )}
              <Route path="/home" component={UserHome} />
              <Route path="/orders" component={Orders} />
              <Route path="/" component={UserHome} />
            </Switch>
          )}

          {/* Displays our Home component as a fallback */}
          <Route path="/" component={Home} />
        </Switch>
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      return dispatch(me())
    },
    fetchCartData: () => {
      dispatch(fetchUserCart())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
