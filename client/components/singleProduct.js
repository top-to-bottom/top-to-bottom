import React from 'react'
import {connect} from 'react-redux'

import {SingleProductCard} from './index'

import {fetchProduct} from '../store/product'

const mapState = ({product}, ownProps) => {
  const id = Number(ownProps.match.params.id)
  return {product, id}
}

const mapDispatch = {fetchProduct}

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.id)
  }

  render() {
    const {product} = this.props
    return (
      <React.Fragment
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <SingleProductCard product={product} />
      </React.Fragment>
    )
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
