import React, {Component} from 'react'
import {setUser, setAdmin} from '../store/user'

import {connect} from 'react-redux'

export class singleUser extends Component {
  constructor() {
    super()
    this.state = {}
  }
  async componentDidMount() {
    await this.props.setUser(this.props.id)
    this.setState(this.props.user)
  }
  render() {
    console.log('PROPS:', this.props)

    const user = this.props.user

    const makeUserAdmin = async newAdminUser => {
      if (confirm('Are you sure? If so, press OK.')) {
        await this.props.makeAdmin(newAdminUser)
        this.props.history.replace(`/users/${newAdminUser.id}`)
      }
    }

    if (this.state.id !== undefined) {
      return (
        <div>
          <div>
            <img
              src={user.imageUrl.slice(1, -1)}
              height="250px"
              width="250px"
            />
          </div>
          <div>First Name: {user.firstName}</div>
          <div>Last Name: {user.lastName}</div>
          <div>Email: {user.email}</div>
          {user.isAdmin === true ? (
            <div>{user.firstName} is an Admin.</div>
          ) : (
            <div>
              <button type="button" onClick={() => makeUserAdmin(user)}>
                Make {user.firstName} an admin.
              </button>
            </div>
          )}
        </div>
      )
    } else {
      return <div>Loading User Information...</div>
    }
  }
}

const mapState = ({user, cart}, ownProps) => {
  const id = Number(ownProps.match.params.id)
  return {user, cart, id}
}

const mapDispatch = dispatch => {
  return {
    setUser: id => dispatch(setUser(id)),
    makeAdmin: user => dispatch(setAdmin(user))
  }
}

export default connect(mapState, mapDispatch)(singleUser)
