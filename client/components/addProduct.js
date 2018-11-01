import React, {Component} from 'react'
import {createProduct} from '../store/products'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
})

function mapState(state) {
  return {
    products: state.products
  }
}

function mapDispatch(dispatch) {
  return {
    submit: newProduct => dispatch(createProduct(newProduct))
  }
}

const categories = [
  {
    id: 1,
    name: 'Hats'
  },
  {
    id: 2,
    name: 'Shoes'
  }
]

export class addProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      price: 0,
      defaultImageUrl: '',
      secondaryImageUrl: '',
      categoryId: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const newProduct = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price * 100,
      defaultImageUrl: String(this.state.defaultImageUrl),
      secondaryImageUrl: String(this.state.secondaryImageUrl),
      categoryId: Number(this.state.categoryId)
    }
    if(!newProduct.defaultImageUrl) {
      newProduct.defaultImageUrl = 'http://www.indiantradebird.in/images/noimage.jpg'
    }
    if(!newProduct.secondaryImageUrl) {
      newProduct.secondaryImageUrl = 'http://www.indiantradebird.in/images/noimage.jpg'
    }
    await this.props.submit(newProduct)
  }

  componentDidUpdate(prevProps) {
    if (this.props.products.length !== prevProps.products.length) {
      this.props.history.push('/products');
    }
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <main>
          <h2>New Product Submission Form</h2>
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="product-name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={evt => this.setState({name: evt.target.value})}
              margin="normal"
              required
            />
            <TextField
              id="product-description"
              label="Description"
              className={classes.textField}
              value={this.state.description}
              onChange={evt => this.setState({description: evt.target.value})}
              margin="normal"
              required
            />
            <TextField
              id="product-price"
              label="Price ($USD)"
              className={classes.textField}
              value={this.state.price}
              onChange={evt => this.setState({price: Number(evt.target.value)})}
              type="number"
              margin="normal"
              InputLabelProps={{shrink: true}}
              required
            />
            <TextField
              id="default-product-image"
              label="Primary Product Image (URL)"
              className={classes.textField}
              value={this.state.defaultImageUrl}
              onChange={evt => this.setState({defaultImageUrl: evt.target.value})}
              type="url"
              margin="normal"
            />
            <TextField
              id="secondary-product-image"
              label="Secondary Product Image (URL)"
              className={classes.textField}
              value={this.state.secondaryImageUrl}
              onChange={evt => this.setState({secondaryImageUrl: evt.target.value})}
              type="url"
              margin="normal"
            />
            <TextField
              id="product-category"
              select
              required
              label="Category"
              className={classes.textField}
              value={this.state.categoryId}
              onChange={evt => this.setState({categoryId: evt.target.value})}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu
                }
              }}
              margin="normal"
              variant="outlined"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
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

addProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapState, mapDispatch)(addProduct))
