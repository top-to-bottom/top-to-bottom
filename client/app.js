import React from 'react'
import {Navbar, Sidebar} from './components'
import axios from 'axios'

import Routes from './routes'

axios.get('/api/cart')
const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Routes />
    </div>
  )
}

export default App
