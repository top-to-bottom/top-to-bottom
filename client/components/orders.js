import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {SingleOrderTable} from './index'

import {fetchOrders} from '../store/orders'

const mapState = ({orders}, ownProps) => {
  const isMe = ownProps.location.pathname.slice(1, 3) === 'me'
  return {orders, isMe}
}

const mapDispatch = {fetchOrders}

class Orders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.isMe)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.fetchOrders(this.props.isMe)
    }
  }

  render() {
    const {orders, isMe} = this.props
    return (
      <React.Fragment>
        {!!orders.length &&
          orders.map(order => (
            <React.Fragment key={order.id}>
              {!isMe ? (
                <Link to={`/orders/${order.id}`}>
                  <h5>
                    Submitted by {order.user ? order.user.email : 'guest user'}
                  </h5>
                  <SingleOrderTable order={order} />
                </Link>
              ) : (
                <SingleOrderTable order={order} />
              )}
            </React.Fragment>
          ))}
      </React.Fragment>
    )
  }
}

export default connect(mapState, mapDispatch)(Orders)
