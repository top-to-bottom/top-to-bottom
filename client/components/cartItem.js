import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {removeCartItem, updateCartItem} from '../store/cart'

class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: props.cartItem.quantity
    }
    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this)
  }

  handleQuantityUpdate(e) {
    e.preventDefault()
    this.props.updateCartItem(this.props.cartItem, this.state.quantity)
  }

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

          <div>Quantity: {this.props.cartItem.quantity}</div>

          <div>
            Price: {numeral(this.props.cartItem.price / 100).format('$0,0.00')}
          </div>

          {''}

          <form onSubmit={this.handleQuantityUpdate}>
            <label>Quantity</label>

            <input
              type="number"
              name="quantity"
              min="0"
              max="10"
              value={this.state.quantity}
              onChange={event => {
                this.setState({quantity: event.target.value})
              }}
            />
            <button>Update</button>
          </form>
          <button
            type="button"
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
    removeItemFromCart: itemId => dispatch(removeCartItem(itemId)),
    updateCartItem: (cartItem, newQuantity) =>
      dispatch(updateCartItem(cartItem, newQuantity))
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
