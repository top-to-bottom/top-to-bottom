import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {removeCartItem} from '../store/cart'

class CartItem extends React.Component {
  render() {
    return (
      <div
        style={{
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: 'red',
          width: '40%',
          display: 'flex',
          padding: 5,
          marginTop: 20,
          alignItems: 'center'
        }}
      >
        <img
          src={this.props.cartItem.product.defaultImageUrl}
          style={{
            height: 100,
            width: 80
          }}
        />

        <div
          style={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            marginLeft: 15
          }}
        >
          <Link to={`/products/${this.props.cartItem.product.id}`}>
            <label>{this.props.cartItem.product.name}</label>
          </Link>

          <label>Quantity: {this.props.cartItem.quantity}</label>

          <label>Price: ${this.props.cartItem.price}</label>
          <button
            style={{
              display: 'flex',
              alignSelf: 'center',
              justifyContent: 'center',
              textAlign: 'center'
            }}
            onClick={() => {
              this.props.removeItemFromCart(this.props.cartItem.id)
            }}
          >
            <label>Delete</label>
          </button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeItemFromCart: itemId => dispatch(removeCartItem(itemId))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
