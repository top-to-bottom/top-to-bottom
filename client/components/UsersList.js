import React from 'react'
import {removeUsers, fetchUsers} from '../store/users'
import {setUser} from '../store/user'
import {Link} from 'react-router-dom'

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
              <div key={user.id} style={{display: 'flex', flexDirection: 'row'}}>
                <li>
                  <Link to={`/users/${user.id}`} >
                  {user.id} - {user.email}
                  </Link>
                </li>

                <button
                  style={{marginLeft: 10}}
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
    setUser: (user) => dispatch(setUser(user.id)),
    deleteUser: user => dispatch(removeUsers(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList)
