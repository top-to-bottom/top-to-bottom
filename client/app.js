import React from 'react'
import { connect } from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import { allProducts } from './store/product'

function mapStateToProps(state) {
  return {
    products: state.products
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(allProducts())
  };
}

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
