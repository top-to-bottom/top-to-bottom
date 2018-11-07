import React from 'react'
import {Elements} from 'react-stripe-elements'

import Checkout from './checkout'

const ElementCheckout = () => {
  return (
    <Elements>
      <Checkout />
    </Elements>
  )
}

export default ElementCheckout
