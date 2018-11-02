import React, {Component} from 'react'
import {editProduct, fetchProduct} from '../store/product'
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

const mapState = ({product}, ownProps) => {
  const id = Number(ownProps.match.params.id)
  return {product, id}
}

const mapDispatch = {fetchProduct, editProduct}

export class updateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProduct(this.props.id)
    this.setState(this.props.product)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const updatedProduct = {
      ...this.state,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      defaultImageUrl: String(this.state.defaultImageUrl),
      secondaryImageUrl: String(this.state.secondaryImageUrl)
    }
    if (!updatedProduct.defaultImageUrl) {
      updatedProduct.defaultImageUrl =
        'http://www.indiantradebird.in/images/noimage.jpg'
    }
    if (!updatedProduct.secondaryImageUrl) {
      updatedProduct.secondaryImageUrl =
        'http://www.indiantradebird.in/images/noimage.jpg'
    }
    await this.props.editProduct(updatedProduct)
    if (this.props.product.updatedAt !== updatedProduct.updatedAt) {
      this.props.history.push(`/products/${this.props.product.id}`)
    }
  }

  render() {
    const {classes} = this.props
    if (this.state.id !== undefined) {
      return (
        <div>
          <main>
            <h2>Update Product Info</h2>
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
                label="Price (CENTS)"
                className={classes.textField}
                value={this.state.price}
                onChange={evt =>
                  this.setState({price: Number(evt.target.value)})
                }
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
                onChange={evt =>
                  this.setState({defaultImageUrl: evt.target.value})
                }
                type="url"
                margin="normal"
              />
              <TextField
                id="secondary-product-image"
                label="Secondary Product Image (URL)"
                className={classes.textField}
                value={this.state.secondaryImageUrl}
                onChange={evt =>
                  this.setState({secondaryImageUrl: evt.target.value})
                }
                type="url"
                margin="normal"
              />
              <button type="submit">Submit</button>
            </form>
          </main>
        </div>
      )
    } else {
      return <div>Loading Product Info...</div>
    }
  }
}

updateProduct.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapState, mapDispatch)(updateProduct))
