import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`
  },
  total: {
    fontWeight: '700'
  },
  title: {
    marginTop: theme.spacing.unit * 2
  }
})

function Review(props) {
  const {classes} = props
  const addresses = [props.streetAddress, props.city, props.state, props.zip]
  const products = props.cart.cartData.map(item => ({
    name: item.product.name,
    subTotal: item.product.price * item.quantity,
    price: item.product.price,
    quantity: item.quantity
  }))

  const total = products.reduce((accum, cur) => accum + cur.subTotal, 0)

  const payments = [
    {name: 'Card type', detail: 'Visa'},
    {name: 'Card holder', detail: props.cardName},
    {name: 'Card number', detail: 'xxxx-xxxx-xxxx-4242'},
    {name: 'Expiry date', detail: '04/2024'}
  ]
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map(product => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${
                product.quantity
              }  -  Unit Price: ${numeral(product.price / 100).format(
                '$0,0.00'
              )}`}
            />
            <Typography variant="body2">
              {numeral(product.subTotal / 100).format('$0,0.00')}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {numeral(total / 100).format('$0,0.00')}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {props.firstName} {props.lastName}
          </Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

Review.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Review)
