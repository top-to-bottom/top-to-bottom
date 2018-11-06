import React from 'react'
import {StripeProvider} from 'react-stripe-elements'

import Routes from './routes'

const App = () => {
  return (
    <div>
      <StripeProvider apiKey="pk_test_ZvcYJgBrblGo1Rbpz1pKGtBt">
        <Routes />
      </StripeProvider>
    </div>
  )
}

export default App
