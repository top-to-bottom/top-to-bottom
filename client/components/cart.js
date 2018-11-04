import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cartItem'

class Cart extends React.Component {
  render() {
    const cartIsEmpty = this.props.cartData.length === 0
    return (
      <div
        style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
      >
        {cartIsEmpty ? (
          <label style={{marginTop: 20}}>Your cart is empty</label>
        ) : (
          this.props.cartData.map(item => {
            return <CartItem key={item.id} cartItem={item} />
          })
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  let cartData = []
  if (state.cart.cartData) {
    cartData = state.cart.cartData
  }
  return {
    cartData
  }
}

export default connect(mapStateToProps)(Cart)
