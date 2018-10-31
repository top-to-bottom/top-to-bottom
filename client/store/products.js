import axios from 'axios'

/**
 * ACTION TYPES
 */
export const GET_PRODUCTS = 'GET_PRODUCTS'
// export const SELECT_SINGLE_PRODUCT = 'SELECT_SINGLE_PRODUCT'

/**
 * INITIAL STATE
 */
// const defaultProduct = {
//   list: [],
//   singleProduct: {}
// }

/**
 * ACTION CREATORS
 */
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

// export const setProduct = singleProduct =>  {
//   return {
//     type: SELECT_SINGLE_PRODUCT,
//     singleProduct
//   }
// }

const addItemToCart = item => {
  return {
    type: ADD_ITEM_TO_CART,
    item
  }
}

const removeItemFromCart = item => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    item
  }
}

/**
 * THUNK CREATORS
 */
export const allProducts = () => async dispatch => {
  try {
    const {data: products} = await axios.get('/api/products')
    const action = getProducts(products)
    dispatch(action)
  } catch (err) {
    console.error(err)
  }
}

// export const setSingleProduct = (id) => async dispatch => {
//   try {
//     const {data: singleProduct} = await axios.get(`/api/products/${id}`)
//     const action = setProduct(singleProduct)
//     dispatch(action);
//   } catch (err) {
//     console.error(err)
//   }
// }

/**
 * REDUCER
 */
export default (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products

    default:
      return state
  }
}
