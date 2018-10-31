import React from 'react'

import {Navbar, Sidebar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Sidebar open={true} />
      <Routes />
    </div>
  )
}

export default App
