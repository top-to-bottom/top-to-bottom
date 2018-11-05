import React from 'react'
import {connect} from 'react-redux'
import CartItem from './cartItem'

class Cart extends React.Component {
  render() {
    const cartIsEmpty = this.props.cartData.length === 0
    let total = 0
    if (!cartIsEmpty) {
      total = this.props.cartData.reduce((acc, item) => {
        return item.price + acc
      }, 0)
    }
    return (
      <div>
        {cartIsEmpty ? (
          <label style={{marginTop: 20}}>Your cart is empty</label>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {this.props.cartData.map(item => {
              return <CartItem key={item.id} cartItem={item} />
            })}
            <label
              style={{
                marginTop: 30,
                textDecoration: 'underline'
              }}
            >
              <ul>Subtotal: {numeral(total / 100).format('$0,0.00')}</ul>
            </label>
          </div>
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
