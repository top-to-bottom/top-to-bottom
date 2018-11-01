import React from 'react'
import {connect} from 'react-redux'

import {SingleOrderTable} from './index'

import {fetchOrders} from '../store/orders'

const mapState = ({orders}) => {
  return {orders}
}

const mapDispatch = {fetchOrders}

class Orders extends React.Component {
  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    const {orders} = this.props
    return (
      <React.Fragment>
        {!!orders &&
          orders.map(order => (
            <SingleOrderTable key={order.id} order={order} />
          ))}
      </React.Fragment>
    )
  }
}

export default connect(mapState, mapDispatch)(Orders)
