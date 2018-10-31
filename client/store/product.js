import axios from 'axios'

/**
 * ACTION TYPES
 */
export const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProduct = {}

/**
 * ACTION CREATORS
 */
export const getProducts = products =>  {
  return {
    type: GET_PRODUCTS,
    products
  }
}

/**
 * THUNK CREATORS
 */
export const allProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/products');
    const products = res.data;
    const action = getProducts(products)
    dispatch(action);
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;

    default:
      return state;
  }
}
