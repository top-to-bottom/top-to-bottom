import React from 'react'
import {connect} from 'react-redux'

import {SingleOrderTable} from './index'

import {fetchOrder} from '../store/order'

const mapState = ({order}, ownProps) => {
  const id = ownProps.match.params.id
  return {order, id}
}

const mapDispatch = {fetchOrder}

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchOrder(this.props.id)
  }

  render() {
    const {order} = this.props
    return (
      <React.Fragment>
        {!!order.id && <SingleOrderTable order={order} />}
      </React.Fragment>
    )
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)
