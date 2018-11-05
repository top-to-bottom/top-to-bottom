import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {HomeList} from './index'

/**
 * COMPONENT
 */
export const AdminHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, Admin {email}</h3>
      <h4>
        <Link to="/me/orders">Review my past Orders</Link>
      </h4>
      <h4>
        {' '}
        <Link to="/orders">Review All Orders</Link>
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

export default connect(mapState)(AdminHome)

/**
 * PROP TYPES
 */
AdminHome.propTypes = {
  email: PropTypes.string
}
