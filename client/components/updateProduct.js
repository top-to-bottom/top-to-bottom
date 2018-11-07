import React, {Component} from 'react'
import {editProduct, fetchProduct} from '../store/product'
import {allCategories} from '../store/categories'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import Select from '@material-ui/core/Select'
import Checkbox from '@material-ui/core/Checkbox'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
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
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const mapState = ({product, categories}, ownProps) => {
  const id = Number(ownProps.match.params.id)
  return {product, categories, id}
}

const mapDispatch = {fetchProduct, editProduct, allCategories}

export class updateProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProduct(this.props.id)
    const oldCategories = [...this.props.product.categories]
    await this.props.allCategories()
    this.setState({
      ...this.props.product,
      categoryHistory: [...oldCategories],
      category: []
    })
  }

  handleChange = event => {
    this.setState({category: event.target.value})
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
    let updatedProductCategories = [...this.state.categoryHistory]
    let newlyAddedProductCategories = this.props.categories.filter(category =>
      this.state.category.includes(category.name)
    )
    updatedProduct.categories = updatedProductCategories.concat(
      newlyAddedProductCategories
    )

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
    const {classes, categories} = this.props

    if (this.state.id !== undefined) {
      return (
        <div>
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
            <div className={classes.root}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">
                  Categories
                </InputLabel>
                <Select
                  multiple
                  value={this.state.category}
                  onChange={this.handleChange}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {categories.map(name => (
                    <MenuItem key={name.id} value={name.name}>
                      <Checkbox
                        checked={this.state.category.indexOf(name.name) > -1}
                      />
                      <ListItemText primary={name.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <button type="submit">Submit</button>
          </form>
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

export default withStyles(styles, {withTheme: true})(
  connect(mapState, mapDispatch)(updateProduct)
)
