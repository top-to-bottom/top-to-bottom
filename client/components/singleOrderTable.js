import React from 'react'
import {Link} from 'react-router-dom'

import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

const styles = theme => ({
  root: {
    width: '80%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 500
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default
    }
  }
})

function CustomizedTable(props) {
  const {classes, order} = props
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>
              Order# {order.id} Status: {order.status} submitted on{' '}
              {order.date.slice(0, 10)} at {order.date.slice(11, 19)}
            </CustomTableCell>
            <CustomTableCell numeric>Quantity</CustomTableCell>
            <CustomTableCell numeric>Price</CustomTableCell>
            <CustomTableCell numeric>SubTotal</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {order.orderData.map(orderData => {
            return (
              <TableRow className={classes.row} key={orderData.id}>
                <CustomTableCell component="th" scope="row">
                  <Link to={`/products/${orderData.product.id}`}>
                    {' '}
                    {orderData.product.name}
                  </Link>
                </CustomTableCell>
                <CustomTableCell numeric>{orderData.quantity}</CustomTableCell>
                <CustomTableCell numeric>
                  {numeral(orderData.price / 100).format('$0,0.00')}
                </CustomTableCell>
                <CustomTableCell numeric>
                  {numeral(orderData.price / 100 * orderData.quantity).format(
                    '$0,0.00'
                  )}
                </CustomTableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <CustomTableCell component="th" scope="row">
              Total
            </CustomTableCell>
            <CustomTableCell numeric />
            <CustomTableCell numeric />
            <CustomTableCell numeric>
              {numeral(
                order.orderData.reduce(
                  (accum, curre) => accum + curre.quantity * curre.price / 100,
                  0
                )
              ).format('$0,0.00')}
            </CustomTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  )
}

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomizedTable)
