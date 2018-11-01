import React from 'react'
import {removeUsers, fetchUsers} from '../store/users'

import axios from 'axios'
import {connect} from 'react-redux'

class UsersList extends React.Component {
  componentDidMount() {
    this.props.fetchUsers()
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.users.map(user => {
            return (
              <div>
                <li>
                  {user.firstName}
                  {user.lastName}
                </li>
                <button
                  onClick={() => {
                    this.props.deleteUser(user)
                  }}
                >
                  x
                </button>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    deleteUser: user => dispatch(removeUsers(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
