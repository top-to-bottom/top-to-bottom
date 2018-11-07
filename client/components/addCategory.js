import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  createCategory,
  allCategories,
  deleteCategory
} from '../store/categories'
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
    categories: state.categories
  }
}

function mapDispatch(dispatch) {
  return {
    fetch: () => dispatch(allCategories()),
    submit: category => dispatch(createCategory(category)),
    delete: id => dispatch(deleteCategory(id))
  }
}

export class addCategory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const newCategory = {
      name: this.state.name
    }
    await this.props.submit(newCategory)
    if (confirm('Success! Category added.')) {
      this.props.history.push(`/categories/add`)
    }
  }

  async handleDelete(event) {
    event.preventDefault()
    if (confirm('Are you sure you want to delete this category?')) {
      await this.props.delete(Number(event.target.value))
      this.props.history.push(`/categories/add`)
    }
  }

  async componentDidMount() {
    await this.props.fetch()
  }

  render() {
    const {classes} = this.props

    if (this.props.categories) {
      return (
        <div>
          <h3>All Current Categories:</h3>
          <div>
            <ul>
              {this.props.categories.map(category => {
                return (
                  <div
                    key={category.id}
                    style={{display: 'flex', flexDirection: 'row'}}
                  >
                    <li>{category.name}</li>

                    <button
                      value={category.id}
                      style={{marginLeft: 10}}
                      onClick={event => this.handleDelete(event)}
                    >
                      X
                    </button>
                  </div>
                )
              })}
            </ul>
          </div>
          <div>
            <h3>Add A New Product Category</h3>
            <form onSubmit={this.handleSubmit}>
              <TextField
                id="category-name"
                label="Category Name"
                className={classes.textField}
                value={this.state.name}
                onChange={evt => this.setState({name: evt.target.value})}
                margin="normal"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Loading all store data... from top to bottom.</h3>
        </div>
      )
    }
  }
}

addCategory.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(connect(mapState, mapDispatch)(addCategory))
