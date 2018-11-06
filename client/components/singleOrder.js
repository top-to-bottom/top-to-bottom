import React from 'react'
import {connect} from 'react-redux'

import {SingleOrderTable} from './index'

import {fetchOrder, updateOrder} from '../store/order'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'

const mapState = ({order, user}, ownProps) => {
  const id = ownProps.match.params.id
  const isAdmin = user.isAdmin
  return {order, id, isAdmin}
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrder: id => dispatch(fetchOrder(id)),
    updateOrder: (id, newStatus) => dispatch(updateOrder(id, newStatus))
  }
}

class SingleOrder extends React.Component {
  constructor() {
    super()
    this.state = {
      anchorEl: null
    }
  }
  componentDidMount() {
    this.props.fetchOrder(this.props.id)
  }

  handleClick = event => {
    this.setState({anchorEl: event.currentTarget})
  }

  handleClose = newStatus => {
    this.props.updateOrder(this.props.order.id, newStatus)
    this.setState({anchorEl: null})
  }

  render() {
    const {anchorEl} = this.state

    const {order, isAdmin} = this.props
    return (
      <React.Fragment>
        {isAdmin && (
          <div
            style={{
              display: 'inline-block',
              marginTop: 30,
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'black'
            }}
          >
            <Button
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              Order Status: {order.status}
              <ArrowDropDown style={{paddingLeft: 10}} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => {
                this.setState({anchorEl: null})
              }}
            >
              <MenuItem onClick={() => this.handleClose('created')}>
                Created
              </MenuItem>
              <MenuItem onClick={() => this.handleClose('processing')}>
                Processing
              </MenuItem>
              <MenuItem onClick={() => this.handleClose('completed')}>
                Completed
              </MenuItem>
              <MenuItem onClick={() => this.handleClose('cancelled')}>
                Cancelled
              </MenuItem>
            </Menu>
          </div>
        )}
        {!!order.id && (
          <SingleOrderTable order={order} isAdmin={this.props.isAdmin} />
        )}
      </React.Fragment>
    )
  }
}

export default connect(mapState, mapDispatchToProps)(SingleOrder)
