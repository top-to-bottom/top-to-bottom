import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import {SingleOrderTable} from './index'

import {fetchOrders} from '../store/orders'

const mapState = ({orders}, ownProps) => {
  const isMe = ownProps.location.pathname.slice(1, 3) === 'me'
  return {orders, isMe}
}

const mapDispatch = {fetchOrders}

class Orders extends React.Component {
  constructor() {
    super()
    this.state = {
      selectedIndex: 0
    }
  }
  componentDidMount() {
    this.props.fetchOrders(this.props.isMe)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.fetchOrders(this.props.isMe)
    }
  }

  handleChange = (event, value) => {
    this.setState({selectedIndex: value})
  }

  render() {
    const {orders, isMe} = this.props
    let displayedOrders = orders
    switch (this.state.selectedIndex) {
      case 0:
        break
      case 1:
        displayedOrders = orders.filter(order => {
          return order.status === 'created'
        })
        break
      case 2:
        displayedOrders = orders.filter(order => {
          return order.status === 'processing'
        })
        break
      case 3:
        displayedOrders = orders.filter(order => {
          return order.status === 'completed'
        })
        break
      case 4:
        displayedOrders = orders.filter(order => {
          return order.status === 'cancelled'
        })
        break
      default:
        break
    }
    return (
      <React.Fragment>
        <Tabs
          value={this.state.selectedIndex}
          onChange={this.handleChange}
          centered
        >
          <Tab label="All" />
          <Tab label="Created" />
          <Tab label="Processing" />
          <Tab label="Completed" />
          <Tab label="Cancelled" />
        </Tabs>
        {!!displayedOrders.length &&
          displayedOrders.map(order => (
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
