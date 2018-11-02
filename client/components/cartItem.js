import React from 'react'
import {connect} from 'react-redux'

import {addItemToCart, setItemsInCart, removeItemFromCart} from '../store/cart'

class CartItem extends React.Component {
  render() {
    return <div />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addItem: item => dispatch(addItemToCart(item)),
    setItems: items => dispatch(setItemsInCart(items)),
    removeItemFromCart: item => dispatch(removeItemFromCart(item))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
