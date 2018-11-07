import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ListProductsCard} from './index'
import {allProducts} from '../store/products'

const mapState = ({products}, ownProps) => {
  const category = ownProps.match.params.category
  // const productsFilter = products.filter(
  //   product => product.category.name === category
  // )
  return {products}
}

const mapDispatch = {allProducts}

class CategoryList extends React.Component {
  componentDidMount() {
    this.props.allProducts()
  }

  render() {
    const {products} = this.props

    return (
      // <React.Fragment>
      <div className="product-list">
        {products.map(product => {
          return (
            <React.Fragment key={product.id}>
              <Link to={`/products/${product.id}`}>
                <ListProductsCard product={product} />
              </Link>
            </React.Fragment>
          )
        })}
        {/* </React.Fragment> */}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(CategoryList)
