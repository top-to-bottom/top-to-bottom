import React from 'react'
import {connect} from 'react-redux'
import {injectStripe, CardElement} from 'react-stripe-elements'

import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'

import AddressForm from './addressForm'
import PaymentForm from './paymentForm'
import Review from './Review'
import {createOrder} from '../store/orders'
import {emptyCart} from '../store/cart'

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
})

const steps = ['Shipping address', 'Payment details', 'Review your order']

function getStepContent(step, props, state, handleChange) {
  switch (step) {
    case 0:
      return <AddressForm {...state} handleChange={handleChange} />
    case 1:
      return <PaymentForm />
    case 2:
      return <Review {...state} cart={props.cart} />
    default:
      throw new Error('Unknown step')
  }
}

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: ''
  }

  componentDidMount() {
    const {user} = this.props
    if (user.id) {
      this.setState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        streetAddress: '',
        city: '',
        state: '',
        zip: ''
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state)
    if (this.state.activeStep === 1) {
      this.props.stripe
        .createToken({type: 'card', name: 'Jenny Rosen'})
        .then(({token}) => {
          console.log('Received Stripe token:', token)
        })
        .then(() => {
          this.setState(state => {
            console.log('inside', this.state)
            return {activeStep: state.activeStep + 1}
          })
        })
    }
    if (this.state.activeStep === 0 || this.state.activeStep === 2) {
      this.setState(state => ({
        activeStep: state.activeStep + 1
      }))
    }
    if (this.state.activeStep === 2) {
      const {
        firstName,
        lastName,
        email,
        streetAddress,
        city,
        state,
        zip
      } = this.state
      const address = {
        firstName,
        lastName,
        email,
        streetAddress,
        city,
        state,
        zipCode: zip
      }
      this.order = this.props.createOrder(address, this.props.cart.id)
      this.props.emptyCart()
    }
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }))
  }

  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {classes} = this.props
    const {activeStep} = this.state

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <form onSubmit={this.handleSubmit}>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {getStepContent(
                    activeStep,
                    this.props,
                    this.state,
                    this.handleChange
                  )}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      // onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </form>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapState = state => {
  const {user, cart} = state
  return {user, cart}
}

const mapDispatch = {createOrder, emptyCart}

export default connect(mapState, mapDispatch)(
  injectStripe(withStyles(styles)(Checkout))
)
