import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addReview, fetchProduct} from '../store/product'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
}

const mapState = state => {
  return {
    user: Number(state.user.id),
    product: state.product
  }
}

function mapDispatch(dispatch) {
  return {
    publish: newReview => dispatch(addReview(newReview)),
    setProduct: id => dispatch(fetchProduct(id))
  }
}

export class addReviewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: 0,
      productId: 0,
      text: '',
      stars: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const newReview = {
      ...this.state,
      userId: this.props.user,
      text: this.state.text,
      stars: this.state.stars
    }
    await this.props.publish(newReview)
    this.props.history.push(`/products/${this.props.product.id}`)
  }

  async componentDidMount() {
    await this.props.setProduct(this.props.match.params.id)
    this.setState({
      userId: Number(this.props.user),
      productId: Number(this.props.product.id),
      text: '',
      stars: 5
    })
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <main>
          <h3>Leave A Review!</h3>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="review-text"
              label="Review"
              className={classes.textField}
              value={this.state.text}
              onChange={evt => this.setState({text: evt.target.value})}
              margin="normal"
              required
            />
            <TextField
              id="review-stars"
              select
              required
              label="Stars"
              className={classes.textField}
              value={this.state.stars}
              onChange={evt => this.setState({stars: evt.target.value})}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              variant="outlined"
            >
              {[1, 2, 3, 4, 5].map(star => (
                <option key={star} value={star}>
                  {star}
                </option>
              ))}
            </TextField>
            <button type="submit">Submit</button>
          </form>
        </main>
      </div>
    )
  }
}

addReviewForm.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapState, mapDispatch)(addReviewForm))
