import React from 'react'
import {Navbar, Sidebar} from './components'
import {connect} from 'react-redux'

import Routes from './routes'
import {allProducts} from './store/products'

function mapStateToProps(state) {
  return {
    products: state.products
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(allProducts())
  }
}

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar open={true} />
      <Routes />
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
