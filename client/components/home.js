import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {HomeList} from './index'

/**
 * COMPONENT
 */
export const Home = props => {
  const num = 1650351
  return (
    <div>
      <h3>Welcome, visitor #{num}</h3>
      <HomeList />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return state
}

export default connect(mapState)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {
  email: PropTypes.string
}
