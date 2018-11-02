import React, { Component } from 'react'
import {setUser} from '../store/user'

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

    const user = this.props.user;
    if(this.state.id !== undefined) {
      return (
        <div>
          <div>
          <img src={user.imageUrl.slice(1, -1)} height="250px" width="250px" />
          </div>
          <div>
          First Name: {user.firstName}
          </div>
          <div>
          Last Name: {user.lastName}
          </div>
          <div>
          Email: {user.email}
          </div>
        </div>
      )
    } else  {
      return (
      <div>Loading User Information...</div>
      )
    }
  }
}

const mapState = ({user}, ownProps) => {
  const id = Number(ownProps.match.params.id)
  return {user, id}
}

const mapDispatch = dispatch => {
  return {
    setUser: (id) => dispatch(setUser(id))
  }
}

export default connect(mapState, mapDispatch)(singleUser)
