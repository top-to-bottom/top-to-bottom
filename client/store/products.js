import axios from 'axios'

/**
 * ACTION TYPES
 */
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
export const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

export const addProduct = newProduct =>  {
  return {
    type: ADD_PRODUCT,
    newProduct
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

export const createProduct = (newProduct) => async dispatch => {
  try {
    const {data: newestProduct} = await axios.post('/api/products/', newProduct)
    const action = addProduct(newestProduct)
    dispatch(action);
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products

    case ADD_PRODUCT:
      return [...state, action.newProduct]

    default:
      return state
  }
}
