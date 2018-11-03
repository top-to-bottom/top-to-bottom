import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {ListProductsCard} from './index'
import {allProducts} from '../store/products'

const mapState = ({products}, ownProps) => {
  const search = ownProps.location.search
  return {products, search}
}

const mapDispatch = {allProducts}

class listProducts extends React.Component {
  componentDidMount() {
    this.props.allProducts(this.props.search)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.allProducts(this.props.search)
    }
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

export default connect(mapState, mapDispatch)(listProducts)
