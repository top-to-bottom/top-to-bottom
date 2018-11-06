import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {HomeList} from './index'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <h4>
        <Link to="/me/orders">Review my past Orders</Link>
      </h4>
      <HomeList />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
